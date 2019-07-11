from flask import Flask, request, render_template, session, redirect, Session
from flask.json import jsonify
from flask_cors import CORS
import requests
import json

import rdflib

app = Flask(__name__)
CORS(app)
app.config['WTF_CSRF_ENABLED'] = False

g = rdflib.Graph()
g.parse("nobeldata.owl")

def query(qs):
    '''
    helper function for the prefixing
    '''
    prefs = '''
PREFIX nob:<http://swat.cse.lehigh.edu/resources/onto/nobel.owl#>
PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX xsd:<http://www.w3.org/2001/XMLSchema#>
'''
    return g.query(prefs + qs)

@app.route('/nobel/nations')
def get_nations():
    '''
    returns all the nations
    '''
    result = query('SELECT (str(?n) as ?NAT) {?w nob:nationality ?n}')
    nationality = []
    for row in result:
      nationality.append(row[0].toPython())
    nationality = [nation.split('/')[4].title() for nation in nationality]
    nationality.sort(key=str.lower)
    nationality = list(set(nationality))

    return jsonify([{'nation':nation} for nation in nationality])

@app.route('/nobel/categories')
def get_categories():
    '''
    returns all the categories
    '''
    result = query('SELECT (str(?c) as ?CAT) {?n nob:WonPrize ?c} ORDER BY (?c)')
    categories = []
    for row in result:
      categories.append(row[0].toPython())
    categories = [category.split('/')[4].title() for category in categories]
    categories = categories.sort(key=str.lower)
    categories = list(set(categories))
    return jsonify([{'category': category} for category in categories])

@app.route('/nobel/years')
def get_years():
    '''
    returns all the years
    '''
    result = query('SELECT (str(?y) as ?YEAR) {?n nob:yearWon ?y}')
    years = []
    for row in result:
      years.append(int(row[0].toPython()))

    years.sort()
    return jsonify([{'year': year} for year in list(set(years))])

@app.route('/nobel/years/<int:year>')
def winners_for_year(year):
    '''
    Returns {category:name} type json
    '''
    result = query('SELECT (str(?n) as ?WINNER) (str(?p) as ?CAT) {?w nob:name ?n; nob:WonPrize ?p. ?p nob:yearWon ?y. FILTER(?y = %s)}' % year)
    winners = []
    categories = []
    for row in result:
      winners.append(row[0].toPython())
      categories.append(row[1].toPython())
    categories = [category.split('/')[4].title() for category in categories]

    return jsonify([{'category': cat, 'winner': winner, 'year': year} for cat, winner in zip(categories, winners)])

@app.route('/nobel/nations/<string:nation>')
def winners_for_nation(nation):
    '''
    Returns {category:name} type json
    '''
    result = query('SELECT (str(?m) as ?WINNER) (str(?p) as ?CAT) (str(?y) as ?YEAR) {?w nob:name ?m; nob:nationality ?n; nob:WonPrize ?p. ?p nob:yearWon ?y FILTER regex(?n, "%s", "i")}' % nation)
    winners = []
    categories = []
    years = []
    for row in result:
      winners.append(row[0].toPython())
      categories.append(row[1].toPython())
      years.append(row[2].toPython())
    categories = [category.split('/')[4].title() for category in categories]

    return jsonify([{'winner': winner, 'category': cat, 'year': year} for cat, winner, year in zip(categories, winners, years)])

@app.route('/nobel/categories/<string:category>')
def winners_for_category(category):
    '''
    TODO: fix query, does not return results
    '''
    result = query('SELECT (str(?m) as ?WINNER) (str(?p) as ?CAT) (str(?y) as ?YEAR) {?w nob:name ?m; nob:nationality ?n; nob:WonPrize ?p. ?p nob:yearWon ?y }')
    winners = []
    categories = []
    years = []
    for row in result:
      winners.append(row[0].toPython())
      categories.append(row[1].toPython())
      years.append(row[2].toPython())
    categories = [category.split('/')[4].title() for category in categories]
    cat_idx = [idx for idx, cat in enumerate(categories) if cat.lower() == category.lower()]
    categories = [cat for idx, cat in enumerate(categories) if idx in cat_idx]
    winners = [winner for idx, winner in enumerate(winners) if idx in cat_idx]
    years = [year for idx, year in enumerate(years) if idx in cat_idx]

    return jsonify([{'category': cat, 'year': year, 'winner': winner} for cat, winner, year in zip(categories, winners, years)])

@app.route('/nobel/<int:year>/<string:category>')
def winner_year_category(year, category):
    '''
    TODO: Query does not filter category
    '''
    result = query('SELECT (str(?m) as ?WINNER) (str(?p) as ?CAT) (str(?y) as ?YEAR) {?w nob:name ?m; nob:nationality ?n; nob:WonPrize ?p. ?p nob:yearWon ?y. FILTER (?y = %s) }' % year)
    winners = []
    categories = []
    years = []
    for row in result:
      winners.append(row[0].toPython())
      categories.append(row[1].toPython())
      years.append(row[2].toPython())
    categories = [category.split('/')[4].title() for category in categories]
    cat_idx = [idx for idx, cat in enumerate(categories) if cat.lower() == category.lower()]
    categories = [cat for idx, cat in enumerate(categories) if idx in cat_idx]
    winners = [winner for idx, winner in enumerate(winners) if idx in cat_idx]
    years = [year for idx, year in enumerate(years) if idx in cat_idx]

    return jsonify([{'category': cat, 'year': year, 'winner': winner} for cat, winner, year in zip(categories, winners, years)])

@app.route('/nobel/<string:name>')
def winner_info(name):
    '''
    Returns all the information relevent to the given name
    '''
    result = query('''SELECT ?m 
                             ?mot
                             ?phot
                             ?b 
                             ?n 
                             ?p 
                             ?asoc
                             ?y
                    WHERE
                             {?w nob:name ?m;
                                nob:nationality ?n;
                                nob:birthYear ?b;
                                nob:Association ?asoc;
                                nob:photo ?phot;
                                nob:WonPrize ?p.
                              ?p nob:yearWon ?y;
                                nob:motivation ?mot.
                              FILTER regex(?m, "%s", "i")
                             } LIMIT 1''' % name)

    name = None
    motive = None
    image = None
    dob = None
    country = None
    category = None
    association = None
    year = None

    for row in result:
        name = row[0]
        motive = row[1]
        image = row[2]
        dob = row[3]
        country = row[4].split('/')[4].replace('_',' ')
        category = row[5].split('/')[4].title()
        association = row[6].split('#')[-1].replace('_',' ')
        year = row[7]

    return jsonify({'year': year, 'association': association, 'category': category, 'country': country, 'dob': dob, 'image': image, 'motive': motive, 'name': name})

if __name__ == '__main__':
    app.run(host='tinman.cs.gsu.edu', port=5001, debug=True)
