import axios from 'axios';

export class myService {
    static BASE_API_URL = "https://bettingapp001.000webhostapp.com/api/";

    public static getBets(category:any){
        return axios.get(this.BASE_API_URL + 'otherbets',{
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
                'category': category
            }
        });
    }

    public static search(query: string,category: string) {
        return axios.get(this.BASE_API_URL + 'search',{
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
                'query': query,
                'category': category
            }
        });
    }
    public static getOthers(category:any) {
        return axios.get(this.BASE_API_URL + 'bets',{
            headers: {
              'Content-Type': 'application/json',
            },
            params: {
                'category': category
            }
        });
    }
}