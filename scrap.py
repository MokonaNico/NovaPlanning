from bs4 import BeautifulSoup
import dateparser
from datetime import datetime   
import json

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
    'ComputVisMachInt' : 'Computer Vision and Machine Intelligence'
}

liste_cours = dict_cours.keys()

events = []

with open('planning.html', encoding="utf-8") as f:
    html_doc = f.read()
soup = BeautifulSoup(html_doc, 'html.parser')

for cours in liste_cours:
    
    parent_node = soup.find_all(text=cours)

    next_node = parent_node[0].parent.parent.parent.parent.parent.parent.findNext('tr').findNext('tr')
    tbody = next_node.find('tbody')
    info = tbody.find_all('td')

    for i in range(0,len(info),5):
        name = dict_cours[cours] + '\n' + info[i+3].text + '\n' + info[i+4].text
        desc = info[i+3].text + ' ' + info[i+4].text
        datetext_begin = info[i].text + ' ' + info[i+1].text[3:8]
        date_begin = dateparser.parse(datetext_begin)

        datetext_end = info[i].text + ' ' + info[i+1].text[10:17]
        date_end = dateparser.parse(datetext_end)

        events.append({
            'title':name,
            'start':date_begin.strftime("%Y-%m-%dT%H:%M:%S"),
            'end':date_end.strftime("%Y-%m-%dT%H:%M:%S")})


with open('events.json', 'w') as my_file:
    my_file.writelines(json.dumps(events))
