import React, { useState } from "react";
import HomeBg from "../../../../animation/HomeBg";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../../../Redux/Actions/UserActions";
import { debounce } from 'lodash';
import { useNavigate } from "react-router-dom";
import { clearSearchUser } from "../../../../Redux/Slices/UsersSlicer";
import Profile from "../../../../../public/defaultProfile.png"
import { newChat } from "../../../../Redux/Actions/ChatActions";

const HomeContent = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {users} = useSelector(state => state.usersState)
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) =>{
        e.preventDefault();
         dispatch(searchUser(search))
        setSearch("")
    }

   
    const handleChange = (e) =>{
        setSearch(e.target.value)
        setIsLoading(true);
        debouncedAPICall(e.target.value);
       
    }

    const debouncedAPICall = debounce((value) => {
        // Perform your API call here
        console.log('API called with value:', value);
        dispatch(searchUser(value))    
        dispatch(clearSearchUser())
        setIsLoading(false);
      }, 1000);

      const handleChat = async(id) =>{        
         setSearch("")
         const newChatStart = {receiverId : id}
         dispatch(newChat(newChatStart))
         dispatch(clearSearchUser())
         navigate("/chat")
      }



  return (
    <>
      <HomeBg />
      <div style={{position: "relative" }} className="h-100 m-2">
        <h1 className="text-center display-1 p-4">
            <Typewriter options={{ strings: ["Hi Welcome", "Find Your Friends" , "Start Your Chat" ], autoStart: true, loop: true, }} />
        </h1>
        <div className="row justify-content-center">
            <div className="col-md-7 col-11 col-sm-10 mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-12">
                          <div>
                            <div className=" position-relative">
                              <input type="text" id="inputPassword5"  autoComplete="off" className="SearchFriends fs-5 text-center" value={search} onChange={ handleChange} />
                              <button type="submit"  className="position-absolute bottom-0 top-0 px-2 pointer end-0 searchIcon d-flex align-items-center"><i className="mdi mdi-magnify fs-1"></i></button>
                            </div>
                          </div>
                        </div>
                        <div style={{maxHeight: "200px", overflow: "scroll"}} className="col-12">
                            <table className="table table-hover table-dark ">
                                <tbody>
                                    {users?.length !== 0 ? (
                                        users?.map((data, i) => (
                                            <tr onClick={()=> handleChat(data._id)} className="pointer" key={i}>
                                                <td className="py-1">
                                                    <img src={data.avatar ? data.avatar: Profile} className="object-fit-cover" style={{ height: "40px", width: "40px" }} alt="image" />
                                                   <span className="ps-3">{data.username}</span>
                                                </td>
                                                {/* <td>{data.username}</td> */}
                                                {/* <td></td> */}
                                                {/* <td>{data.email}</td> */}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center fs-1 py-4">Not ☹️ Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  );
};

export default HomeContent;
