
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

from datetime import datetime   
import dateparser
import json
import time
import os

from course_info import course_info
from course_math import course_math

URL = "https://hplanning2023.umons.ac.be/invite"

course_dict = {"INFO": course_info, "MATH": course_math}

WAITING_TIME = 5
output = {}

def move_to_start_position(driver):
    # Go into "Formations" tab
    formation = driver.find_element(By.XPATH, '//div[text()="Formations"]')
    action = ActionChains(driver)
    action.move_to_element(formation)
    action.click()
    action.perform()

    # Go into "Récapitulatif des cours" tab
    recap = driver.find_element(By.XPATH, '//div[text()="Options"]')
    action = ActionChains(driver)
    action.move_to_element(recap)
    action.move_by_offset(70,30)
    action.click()
    action.perform()


def move_to_combo(driver):
    select = driver.find_element(By.XPATH, '//div[@class="ocb_cont as-input as-select "]')
    action = ActionChains(driver)
    action.move_to_element(select)
    action.move_by_offset(5,5)
    action.click()
    action.perform()

def move_down(driver,n,begin_enter=False):
    action = ActionChains(driver)
    if(begin_enter):
        action.send_keys(Keys.ENTER)
    for i in range(n):
       action.send_keys(Keys.ARROW_DOWN)
    action.send_keys(Keys.ENTER)
    action.perform()

def get_information(driver,name, course_id):
    if course_id not in output:
        output[course_id] = {}
    output[course_id][name] = {}
        
    course = course_dict[course_id]
    
    tables = driver.find_elements(By.XPATH,'//table[@class="as-content"]/tbody/tr')

    for i in range(1,len(tables),2):
        course_name = tables[i].find_elements(By.XPATH,'./td/table/tbody/tr/td/span')[0].text
        if course_name in course:
            course_name = course[course_name]
        if course_name not in output[course_id][name]:
            output[course_id][name][course_name] = []
        list_cursus = tables[i+1].find_elements(By.XPATH,'./td/div/table/tbody/tr')
        for cursus in list_cursus:
            info  = cursus.find_elements(By.XPATH,'./td')

            date  = info[0].find_element(By.XPATH,'./ul/li').get_attribute("innerHTML").replace("&nbsp;", " ")
            _time = info[1].get_attribute("innerHTML").replace("&nbsp;", " ")
            start = dateparser.parse(date + ' ' + _time[3:8]).strftime("%Y-%m-%dT%H:%M:%S")
            end   = dateparser.parse(date + ' ' + _time[10:17]).strftime("%Y-%m-%dT%H:%M:%S")

            teacher = info[3].get_attribute("innerHTML").replace("&nbsp;", " ")
            room = info[4].get_attribute("innerHTML").replace("&nbsp;", " ")
            title = course_name + '\n' + teacher + '\n' + room

            output[course_id][name][course_name].append({'title':title,'start':start,'end':end})

            
options = Options()
options.add_argument('-headless')
driver = webdriver.Firefox(options=options)
driver.get(URL)
time.sleep(WAITING_TIME) # wait for the page to load
move_to_start_position(driver)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,16)
time.sleep(WAITING_TIME)
get_information(driver,"BAB1 INFO", "INFO")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,1)
time.sleep(WAITING_TIME)
get_information(driver,"BAB1 MATH", "MATH")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,23)
time.sleep(WAITING_TIME)
get_information(driver,"BAB2 INFO", "INFO")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,1)
time.sleep(WAITING_TIME)
get_information(driver,"BAB2 MATH", "MATH")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,23)
time.sleep(WAITING_TIME)
get_information(driver,"BAB3 INFO", "INFO")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,1)
time.sleep(WAITING_TIME)
get_information(driver,"BAB3 MATH", "MATH")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,59)
time.sleep(WAITING_TIME)
get_information(driver,"MASTER INFO", "INFO")
time.sleep(WAITING_TIME)
move_to_combo(driver)
time.sleep(WAITING_TIME)
move_down(driver,3)
time.sleep(WAITING_TIME)
get_information(driver,"MASTER MATH", "MATH")
driver.quit()

with open('events.json', 'w') as my_file:
    my_file.writelines(json.dumps(output, indent=4))
