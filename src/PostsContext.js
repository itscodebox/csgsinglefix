import React ,{createContext , useState} from 'react';

export const PostsContext = createContext();

// const PostsContextProvider = (props)=>{
//     const [posts,setPosts] = useState([]);
//     return (
//         <PostsContext.Provider value={{posts,setPosts}}>
//             {props.children}
//         </PostsContext.Provider>
//     )
// }

// export default PostsContextProvider;
