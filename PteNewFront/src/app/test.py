from selenium import webdriver
from flask_cors import CORS
from flask import Flask, jsonify,request
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep
from multiprocessing import Process
import requests
from selenium.webdriver.chrome.service import Service
app = Flask(__name__)
CORS(app)

@app.route('/scrape-linkedin-profiles', methods=['GET'])
def scrape_linkedin_profiles():
    args = request.args
    domainparam = args.get('domainparam')
    locationparam = args.get('locationparam')
    print(domainparam,locationparam)
    # Creating a webdriver instance
    service = Service("D://chromedriver.exe", port=9515)
    driver = webdriver.Chrome(service=service)
    driver.get("https://linkedin.com/uas/login")
    #  waiting for the page to load
    sleep(2)

   
    username = driver.find_element(By.ID, "username")
    username.send_keys("youssef.bkhayatia@gmail.com")  # Replace with your LinkedIn username/email

    pword = driver.find_element(By.ID, "password")
    pword.send_keys("123456y y")  # Replace with your LinkedIn password
    
  
    driver.find_element(By.XPATH, "//button[@type='submit']").click()
    
    result = {}
    namelist = []
    jobslist = []
    locationlist = []
    schoollist = []
    profile_urls = []
    a=0

    text = 'linkedin AND {} AND {}'.format(domainparam, locationparam)

    query = 'https://google.com/search?q=' + text
    response = requests.get(query)

    soup = BeautifulSoup(response.text, 'html.parser')

    if locationparam == 'Tunisia' or locationparam == 'tunisia' or locationparam == 'Tunisie' or locationparam == 'tunisie':
        firsttwoletters = 'tn'
    if locationparam == 'France' or locationparam == 'france':
        firsttwoletters = 'fr'
    print(firsttwoletters)

    linkedinlink = 'https://{}.linkedin.com/in/'.format(firsttwoletters)

    for anchor in soup.find_all('a'):
        url = anchor["href"]
        if linkedinlink in url:
            url = url[7:url.find('&')]
            profile_urls.append(url)
    print(profile_urls)

    # visit each profile on LinkedIn and grab the details
    for i, profile in enumerate(profile_urls):
        if linkedinlink not in profile:
            del profile_urls[i]
            continue
        driver.get(profile)
        sleep(2)
        soup2 = BeautifulSoup(driver.page_source, 'html.parser')

       
        target_name = soup2.find("h1", {"class": "text-heading-xlarge inline t-24 v-align-middle break-words"})
        name = None if target_name is None else target_name.string.strip()
        namelist.append(name)

      
        target_job_title = soup2.find("div", {"class": "text-body-medium break-words"})
        job_title = None if target_job_title is None else target_job_title.string.strip()
        jobslist.append(job_title)

      
        target_schools = soup2.find_all("h2", {"class": "pv-text-details__right-panel-item-text hoverable-link-text break-words text-body-small inline"})
        school = ''
        if target_schools is None:
            school = ''
        else:
            for target_school in target_schools:
                school += target_school.div.text.strip() + ','

        school = school.rstrip(',')
        schoollist.append(school)

  
        target_location = soup2.find("span", {"class": "text-body-small inline t-black--light break-words"})
        location = None if target_location is None else target_location.string.strip()
        locationlist.append(location)

        result[i] = {
            "name": namelist[i],
            "job": jobslist[i],
            "location": locationlist[i],
            "profileUrl": profile_urls[i],
            "schools": schoollist[i]
        }
    print(result)
    return jsonify(result)

def run_flask_server():
    app.run(port=5000)

if __name__ == "__main__":
    app.run(debug=True)
    # domainparam = "développement"  # Replace with your desired domain parameter
    # locationparam = "Tunisia"  # Replace with your desired location parameter
    # print(domainparam)
    # # Creating a webdriver instance
    # service = Service("D://chromedriver.exe", port=9515)
    # driver = webdriver.Chrome(service=service)
    # # This instance will be used to log into LinkedIn

    # # Opening LinkedIn's login page
    # driver.get("https://linkedin.com/uas/login")

    # # waiting for the page to load
    # sleep(5)

    # # entering username
    # username = driver.find_element(By.ID, "username")
    # username.send_keys("jihed5504@gmail.com")  # Replace with your LinkedIn username/email

    # # entering password
    # pword = driver.find_element(By.ID, "password")
    # pword.send_keys("1357a2468J")  # Replace with your LinkedIn password

    # # Clicking on the log in button
    # driver.find_element(By.XPATH, "//button[@type='submit']").click()

    # # Start Flask server in a separate process
    # flask_server_process = Process(target=run_flask_server)
    # flask_server_process.start()

    # # Perform web scraping
    # results = scrape_linkedin_profiles()
    # print(results)

    # # Quit the webdriver and terminate the Flask server process
    # # driver.quit()
    # # flask_server_process.terminate()
