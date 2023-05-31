from selenium.webdriver.common.by import By
from time import sleep
from bs4 import BeautifulSoup
from flask_cors import CORS, cross_origin




app = Flask(__name__)
CORS(app)
app.config['JSON_AS_ASCII'] = False


username=''
password=''
@app.route('/')
@cross_origin()
def index():
    return ""


@app.route("/profiles", methods=['GET'])
@cross_origin()
def get():
    args = request.args
    domainparam = args.get('domain')
    locationparam = args.get('location')
    print(domainparam,locationparam)
    driver = webdriver.Chrome('d:/chromedriver')
    # preparing csv file to store parsing result later
    # writer = csv.writer(open('testing1.csv', 'w'))
    # writer.writerow(['name', 'job_title', 'location', 'ln_url'])
    driver.get('https://www.linkedin.com/')

    username_input = driver.find_element(By.NAME,'session_key')
    username_input.send_keys(username)

    # put your linkedin password here
    password_input = driver.find_element(By.ID, 'session_password')
    password_input.send_keys(password)
    sleep(2)

    # locate submit button by_class_name
    log_in_button = driver.find_element(By.CLASS_NAME,'sign-in-form__submit-button')
    # .click() to mimic button click
    log_in_button.click()

    result={}
    namelist = []
    jobslist = []
    locationlist = []
    schoollist = []
    profile_urls = []  # To store the Profile URLs
    a=0


    #text = 'linkedin.com/in/ AND {} AND {}'.format(domainparam,locationparam)
    text = 'linkedin AND {} AND {}'.format(domainparam,locationparam)

    query = 'https://google.com/search?q=' + text
    response = requests.get(query)

    soup = BeautifulSoup(response.text, 'html.parser')

    if locationparam == 'Tunisia' or locationparam == 'tunisia' or locationparam == 'Tunisie' or locationparam == 'tunisie':
        firsttwoletters='tn'
    if locationparam == 'France' or locationparam == 'france':
        firsttwoletters='fr'
    print(firsttwoletters)


    linkedinlink='https://{}.linkedin.com/in/'.format(firsttwoletters)





    for anchor in soup.find_all('a'):
        url = anchor["href"]
        if linkedinlink in url:
            url = url[7:url.find('&')]
            profile_urls.append(url)
    print(profile_urls)


    # visit each profile in linkedin and grab detail we want to get
    for i,profile in enumerate(profile_urls):
        if linkedinlink not in profile:
            del profile_urls[i]
            continue
        #if i==3:
           # break
        driver.get(profile)
        sleep(1)
        soup2 = BeautifulSoup(driver.page_source, 'html.parser')

        # get name
        target_name = soup2.find("h1", {"class": "text-heading-xlarge inline t-24 v-align-middle break-words"})
        name= None if target_name is None else target_name.string.strip()
        namelist.append(name)

        # get job title
        target_job_title = soup2.find("div", {"class": "text-body-medium break-words"})
        job_title = None if target_job_title is None else target_job_title.string.strip()
        jobslist.append(job_title)

        # get education
        target_schools = soup2.find_all("h2", {"class": "pv-text-details__right-panel-item-text hoverable-link-text break-words text-body-small inline"})
        school = ''
        if target_schools is None:
            school = ''
        else:
            for target_school in target_schools:
                school += target_school.div.text.strip() + ','

        school = school.rstrip(',')
        schoollist.append(school)

        # get location
        target_location = soup2.find("span", {"class": "text-body-small inline t-black--light break-words"})
        location = None if target_location is None else target_location.string.strip()
        locationlist.append(location)

        result[i]={"name":namelist[i],
                   "job":jobslist[i],
                   "location":locationlist[i],
                   "profileUrl":profile_urls[i],
                   "schools":schoollist[i]
                   }

    driver.quit()
    return jsonify({'data': result})



if __name__ == "__main__":
    app.run(debug=True)