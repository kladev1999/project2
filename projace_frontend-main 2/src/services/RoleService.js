import axios from 'axios'
import authHeader from "./Auth-HeaderService";
const ROLE_BASE_REST_API_URL = 'http://localhost:8080/api/r1/roles';

class RoleService{

    getAllRoles(){
        return axios.get(ROLE_BASE_REST_API_URL,{ headers: authHeader()})
    }

    createRole(role){
        return axios.post(ROLE_BASE_REST_API_URL, role,{ headers: authHeader()})
    }

    getRoleById(roleId){
        return axios.get(ROLE_BASE_REST_API_URL + '/' + roleId,{ headers: authHeader()});
    }

    updateRole(roleId, role){
        return axios.put(ROLE_BASE_REST_API_URL + '/' +roleId, role,{ headers: authHeader()});
    }

    deleteRole(roleId){
        return axios.delete(ROLE_BASE_REST_API_URL + '/' + roleId,{ headers: authHeader()});
    }
}

export default new RoleService();