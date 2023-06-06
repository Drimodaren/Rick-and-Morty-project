import BackButton from "."

export const WithBackButton =(Component)=>(props)=>{
return <> <BackButton/> <Component {...props}/> </> 
}