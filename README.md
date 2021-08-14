
# SUMO

The code for the SUMO (Singapore Universities Mission Oxygen) campaign website (https://www.sumo.sg/)

 - Static site served by Firebase Hosting on Google Cloud, accelerated by Google Cloud CDN
 - Github Actions used for CI/CD (see .github/workflows/)
 - Using jQuery, Bootstrap 4 for the static site
 - Graphs are embedded `iframes` of published google sheets charts

The amount raised and number of supported is fetched by scraping the Milaap Campaign page using a Cloud Function:

    import requests, json
    from bs4 import BeautifulSoup
    def getMilaapInfo(event):
        #set the url
        URL = "https://milaap.org/fundraisers/SUMO"

        #instantiate http request object and make a GET request
        request = requests.get(URL)
        html = request.text
        
        #instantiate soup object
        soup = BeautifulSoup(html, 'html.parser')
        
        #extract thge amount
        mydivs = soup.find_all("div", {"class": "amount"})
        amount = mydivs[0].text
        amount = "".join(amount.split())
        
        #extract the supporters
        myspans = soup.find_all("span", {"class": "donation-count"})
        supporters = myspans[0].text.split(" ")[0]

        if event.method == 'OPTIONS':
            # Allows GET requests from any origin with the Content-Type
            # header and caches preflight response for an 3600s
            headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '3600'
            }

            return ('', 204, headers)

        # Set CORS headers for the main request
        headers = {
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Origin': '*'
        }

        
        
        #return the result
        return (json.dumps({"amount": amount, "supporters": supporters}), 200, headers)



Raise a PR to contribute!
