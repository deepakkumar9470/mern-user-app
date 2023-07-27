import React,{useState,useEffect} from 'react'
import {Form,Button,Dropdown} from 'react-bootstrap';
import {AiOutlinePlus} from 'react-icons/ai'
import {FaAccusoft, FaFileCsv, FaSort} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import MyTables from '../../components/Tables/MyTable'
import { deleteUser, exportUserToCSV, getUsers } from '../../services/api';
import {toast} from 'react-hot-toast'

const Home = () => {
  const navigate = useNavigate()
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(true)
  const [search,setSearch] = useState("")
  const [gender,setGender] = useState("All")
  const [status,setStatus] = useState("All")
  const [page,setPage] = useState(1)
  const [pageCount,setPageCount] = useState(0)
  
  const getUsersData =  async () =>{
     try {
         const res = await getUsers(search,gender,status,page)
         if(res.status === 200){
          setUsers(res.data.user)
          setPageCount(res.data.Pagination.pageCount)
         }
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(() => {
   setTimeout(() => {
    setLoading(false)
   }, 1200);
   getUsersData()
  }, [search,gender,status,page])
  
  const addUser = () =>{
    navigate('/add')
  }

  const deleteCurrentUser = async(id) =>{
      try {
            const res =   await deleteUser(id)
           
            toast.success('User deleted successfully',{
              icon: <FaAccusoft/>
            })
            if(res.status === 200){
              getUsersData()
            }else{
              toast.error('Opps error in deleting user!')
            }
            
      } catch (error) {
        console.log(error)
      }
  }

  

  //Pagination Previous
  const paginatePrevious = ()=>{
    
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  //Pagination Next
  const paginateNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }

  return (
   <>
      <div className="container">
        <div className="main_div">

          <div className="search_add mt-4 d-flex justify-content-between">
            <div className="search col-lg-4">
                <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={(e)=>setSearch(e.target.value)}
                />
                <Button variant="success">Search</Button>
              </Form>
            </div>

            <div className="add_btn">
            <Button variant="primary" onClick={addUser}>
              <AiOutlinePlus/> Add User
            </Button>
            </div>
          </div>
           
           <div className="filter_div mt-4 d-flex justify-content-between">
  
              <div className="filter_gender">
                  <div className="filter">
                     <h3>Filter by Gender</h3>
                       <div className="gender d-flex justify-content-between">
                       <Form.Check  
                          type={"radio"} 
                          name="gender"
                          onChange={(e)=>setGender(e.target.value)}
                          label={`All`}
                          value={"All"}
                          defaultChecked
                          />
                        <Form.Check  
                          type={"radio"} 
                          name="gender"
                          onChange={(e)=>setGender(e.target.value)}
                          label={`Male`}
                          value={"Male"}
                          
                          />
                        <Form.Check  
                          type={"radio"} 
                          name="gender"
                          onChange={(e)=>setGender(e.target.value)}
                          label={`Female`}
                          value={"Female"}
                          
                          />
                       </div>
                  </div>
              </div>

         

              {/* Filter by status */}
              <div className="filter_status">
                  <div className="status">
                  <h3>Filter by Status</h3>
                  <div className="status_radio d-flex  justify-content-between">
                       <Form.Check  
                          type={"radio"} 
                          name="status"
                          onChange={(e)=>setStatus(e.target.value)}
                          label={`All`}
                          value={"All"}
                          defaultChecked
                          />
                        <Form.Check  
                          type={"radio"} 
                          name="status"
                          onChange={(e)=>setStatus(e.target.value)}
                          label={`Active`}
                          value={"Active"}
                          
                          />
                        <Form.Check  
                          type={"radio"} 
                          name="status"
                          onChange={(e)=>setStatus(e.target.value)}
                          label={`InActive`}
                          value={"InActive"}
                          
                          />
                       </div>
                  </div>
              </div>
           </div>
        </div>
    </div>
      {
        loading ? <Loader/> : 
        <MyTables 
        users = {users} 
        deleteCurrentUser={deleteCurrentUser}
        getUsersData = {getUsersData}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
        paginatePrevious = {paginatePrevious}
        paginateNext={paginateNext}
        />
      }
   </>
  )
}

export default Home