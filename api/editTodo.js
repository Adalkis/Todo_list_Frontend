import axios from 'axios';

export default{
    async updateTodo(id ,name ){
        let data =  await axios.patch(`http://localhost:8000/api/item/${id}`, name);
        return data;
    }
}