import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import RoleService from '../../../services/RoleService';



function AddRoleComponent() {
  const [name, setName] = useState('')
  const history = useNavigate();
  const { id } = useParams();

  const saveOrUpdateRole = (e) => {

    e.preventDefault();

    const role = { name }

    if (id) {

      RoleService.updateRole(id, role).then((response) => {
        history('/Role')
      }).catch(error => {
        console.log(error)
      })

    } else {
      RoleService.createRole(role).then((response) => {

        console.log(response.data)

        history('/Role');

      }).catch(error => {
        console.log(error)
      })
    }

  }

  useEffect(() => {
    RoleService.getRoleById(id).then((response) => {
      setName(response.data.name)
    }).catch(error => {
      console.log(error)
    })
  }, [id])
  const title = () => {

    if (id) {
      return <h2 className="text-center">Update Role</h2>
    } else {
      return <h2 className="text-center">Add Role</h2>
    }
  }

  return (
    <div>
      <br /><br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {
              title()
            }
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Name Role:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    name="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  >
                  </input>
                </div>
                <button className="btn btn-success" onClick={(e) => saveOrUpdateRole(e)} >Submit </button>
                <Link to="/Role" className="btn btn-danger"> Cancel </Link>
              </form>

            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AddRoleComponent
