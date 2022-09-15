from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains

from datetime import datetime   
import dateparser
import json
import time

dict_cours = {
    'Réseaux II' : 'Réseaux II',
    'Crypto sécurité info': 'Cryptographie et sécurité des systèmes informatiques',
    'Graphes et intelligence artifi' : 'Graphes et intelligence artificielle',
    'Deep Learning for Natural Lang' : 'Deep Learning for Natural Language and Sequence Processing',
    'AdvDeepLearn' : 'Advanced machine learning and deep learning',
    'AdvMachLearn' : 'Advanced machine learning and deep learning',
    'Méthodes formelles : intro' : 'Méthodes formelles pour la conception de systèmes : fondements',
    'Méthodes formelles : Fondem.' : 'Méthodes formelles pour la conception de systèmes : fondements',
    'Méth. formelles application' : 'Méthodes formelles pour la conception de systèmes : applications',
    'Calcul.et complexité' : 'Calculabilité et complexité',
    'ComputVisMachInt' : 'Computer Vision and Machine Intelligence',
    'SignProces1' : 'Signal Processing'
}
liste_cours = dict_cours.keys()

events = []

options = Options()
options.headless = False

driver = webdriver.Firefox(options=options)
driver.get("https://hplanning2022.umons.ac.be/invite")
time.sleep(5)
driver.find_element(By.XPATH, '//div[text()="Formations"]').click()
time.sleep(5)
recap = driver.find_element(By.XPATH, '//span[text()=" Récapitulatif des cours"]')

print(recap.size)
action = ActionChains(driver)
action.move_to_element_with_offset(recap, 65, 7)
action.click()
action.perform()

with open('events.json', 'w') as my_file:
    my_file.writelines(json.dumps(events))
