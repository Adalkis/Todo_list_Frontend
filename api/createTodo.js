import axios from 'axios';


export default{
    async createTodo(name){
        let data = await axios.post('http://localhost:8000/api/item/', name);
        return data;
    }
}