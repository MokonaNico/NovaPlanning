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


options = Options()
options.headless = True
driver = webdriver.Firefox(options=options)
driver.get("https://hplanning2022.umons.ac.be/invite")
time.sleep(5) # wait for the page to load
move_to_start_position(driver)
time.sleep(1)
move_down(driver,16)
time.sleep(1)
print(driver.page_source)