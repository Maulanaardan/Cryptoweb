import Navbar from "../fragment/Navbar"

const TemplateLayout = (props) => {
    const {children, classname} = props
    return(
        <div className={`m-0 pb-4 w-full min-h-screen bg-gradient-to-b from-purple-700 to-purple-500 via-blue-600 ${classname}`}>
            <Navbar/>
            {children}
        </div>
    )
}

export default TemplateLayout