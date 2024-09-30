import streamlit as st
from elasticsearch import Elasticsearch

# Connexion à Elasticsearch
es_url = "https://69237f18eb324640820f5411bef89351.us-central1.gcp.cloud.es.io:443"
api_key = "RTdpT09aSUJKdngwWTZjdzU4c206bzNLYl9EV05TNmk2STV2RG1QWXRfZw=="
es = Elasticsearch(es_url, api_key=api_key)

# Récupération des prénoms existants pour l'autocomplétion
def get_first_names():
    # Requête pour récupérer tous les prénoms
    query = {
        "size": 1000,  # Ajuste la taille selon le besoin
        "query": {
            "match_all": {}
        },
        "_source": ["FirstName"]
    }
    response = es.search(index="employee_db", body=query)
    first_names = [hit["_source"]["FirstName"] for hit in response["hits"]["hits"]]
    return list(set(first_names))  # Utiliser set pour éviter les doublons

# Titre de l'application
st.title('Recherche des employés par prénom')

# Récupérer les prénoms pour l'autocomplétion
first_names = get_first_names()

# Saisie du prénom de l'employé à rechercher avec autocomplétion
first_name = st.selectbox("Entrez le prénom de l'employé à rechercher",options=[""] + first_names)

# Recherche dans Elasticsearch
if st.button('Rechercher'):
    if first_name:
        # Construction de la requête pour rechercher par prénom
        query = {
            "query": {
                "match": {
                    "FirstName": first_name
                }
            }
        }

        # Exécution de la requête de recherche
        response = es.search(index="employee_db", body=query)

        # Affichage des résultats
        hits = response['hits']['hits']
        if hits:
            st.write(f"Résultats pour '{first_name}':")
            for hit in hits:
                source = hit["_source"]
                st.write(f"Prénom: {source['FirstName']}, Nom: {source['LastName']}, Poste: {source['Designation']}, "
                         f"Salaire: {source['Salary']}, Date d'embauche: {source['DateOfJoining']}, "
                         f"Adresse: {source['Address']}, Sexe: {source['Gender']}, Âge: {source['Age']}, "
                         f"Statut marital: {source['MaritalStatus']}, Intérêts: {source['Interests']}")
        else:
            st.write(f"Aucun résultat trouvé pour '{first_name}'.")
    else:
        st.write("Veuillez entrer un prénom pour la recherche.")
