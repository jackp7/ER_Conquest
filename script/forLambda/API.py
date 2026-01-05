import requests
import json
from datetime import datetime
from pytz import timezone
import boto3

def getUserNumber(nickname):
    key = ""
    url = f"https://open-api.bser.io/v1/user/nickname?query={nickname}"
    headers = {
        'accept': 'application/json',
        'x-api-key': key
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data['user']['userNum']
    except requests.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
        return None
    except Exception as err:
        print(f'An error occurred: {err}')
        return None

def getUserInfo(user_num):
    key = ""
    season_id = 17  
    matching_team_mode = 3 
    url = f"https://open-api.bser.io/v1/rank/{user_num}/{season_id}/{matching_team_mode}"
    headers = {
        'accept': 'application/json',
        'x-api-key': key
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')
        return None
    except Exception as err:
        print(f'An error occurred: {err}')
        return None

def is_time_for_elimination():
    # Define the timezone
    eastern = timezone('US/Eastern')

    # Get the current time
    current_time = datetime.now(eastern)

    # Check if it's between 11:30 PM and 12:30 AM
    if ((current_time.hour == 23 and current_time.minute >= 30) or 
        (current_time.hour == 0 and current_time.minute <= 30)):
        return True
    else:
        return False

def updatePlayerData(fileName):
    json_data = readFromS3(fileName)

    for player in json_data:
        if player['eliminated'] == False:
            nickname = player["name"]
            try:
                userNum = getUserNumber(nickname)
                userInfo = getUserInfo(userNum)
                print(userInfo)
                player['mmr'] = userInfo['userRank']['mmr']
                player['rank'] = userInfo['userRank']['rank']
            except Exception as e:
                print(f"Failed to get user number for {nickname}. Error: {str(e)}")

    if is_time_for_elimination(): #this is when we 12am for elimatination
        sorted_players = sorted([player for player in json_data if not player.get('eliminated', False)], key=lambda x: x['mmr'], reverse=True)

        # Set 'eliminated' to True for the players with the lowest 4 'mmr'
        for player in sorted_players[-4:]:
            player['eliminated'] = True

    writeToS3(json_data,fileName)



def readFromS3(fileName):
    # Create an S3 client
    s3 = boto3.client('s3', region_name='us-west-2', aws_access_key_id='', aws_secret_access_key='')

    # Specify the S3 bucket name
    bucket_name = 'erbootcamp'

    try:
        # Get the object from the S3 bucket
        response = s3.get_object(Bucket=bucket_name, Key=fileName)

        # Load the JSON data from the response
        json_data = json.loads(response['Body'].read().decode('utf-8'))

        return json_data

    except Exception as e:
        print(f"Failed to read data from S3 bucket. Error: {str(e)}")
        return None

def writeToS3(json_data,fileName):
    s3 = boto3.client('s3', region_name='us-west-2', aws_access_key_id='', aws_secret_access_key='')
    bucket_name = 'erbootcamp'
    try:
        s3.put_object(Body=json.dumps(json_data), Bucket=bucket_name, Key=fileName)
        print(f"Successfully wrote data to S3 bucket: {bucket_name}/{fileName}")
    except Exception as e:
        print(f"Failed to write data to S3 bucket. Error: {str(e)}")

if __name__ == "__main__":
    updatePlayerData("casualPlayers.json")
    #updatePlayerData("proPlayers.json")

