import axios from 'axios';

export default{
    async getTodo(){
        let data =  await axios.get('http://localhost:8000/api/item');
        return data;

}

}