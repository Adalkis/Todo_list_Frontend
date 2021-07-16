import axios from 'axios';

export default{
    async deleteTodo(id){
        let data = await axios.delete(`http://localhost:8000/api/item/${id}`)
    }
}