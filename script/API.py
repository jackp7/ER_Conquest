import requests
import json
from datetime import datetime
from pytz import timezone

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
    season_id = 18
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
    with open('../public/test.json', 'r') as f:
        json_data = json.load(f)

    for player in json_data:
        if player['eliminated'] == False:
            nickname = player["name"]
            try:
                userNum = getUserNumber(nickname)
                userInfo = getUserInfo(userNum)
                if(userInfo['userRank']['rank'] != 0 ):
                    player['mmr'] = userInfo['userRank']['mmr']
                    player['rank'] = userInfo['userRank']['rank']
            except Exception as e:
                print(f"Failed to get user number for {nickname}. Error: {str(e)}")

    if is_time_for_elimination(): #this is when we 12am for elimatination
        sorted_players = sorted([player for player in json_data if not player.get('eliminated', False)], key=lambda x: x['mmr'], reverse=True)

        # Set 'eliminated' to True for the players with the lowest 4 'mmr'
        for player in sorted_players[-4:]:
            player['eliminated'] = True

    print(json_data)


if __name__ == "__main__":
    updatePlayerData("test.json")

