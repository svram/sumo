
# SUMO

The code for the SUMO (Singapore Universities Mission Oxygen) campaign website (https://www.sumo.sg/)

 - Static site hosted on S3, accelerated by Cloudfront CDN
 - Github Actions used for CI/CD (see .github/workflows/main.yml)
 - Using jQuery, Bootstrap 4 for the static site
 - Graphs are embedded `iframes` of published google sheets charts

The amount raised and number of supported is fetched by scraping the Milaap Campaign page using a Lambda function:

    import requests, json
    from bs4 import BeautifulSoup
    def lambda_handler(event, context):
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
	    
	    #return the result
	    return json.dumps({"amount": amount, "supporters": supporters})

Raise a PR to contribute!
