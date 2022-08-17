import { useState } from "react"
import { IoIosArrowDropdown } from "react-icons/io"

const DropDown = ({ setCountry, country }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggle = () => {
        setIsMenuOpen(prevState => !prevState)
    }

    return (
        <div className="dropdown-menu">
            <div className="dropdown-menu--select" onClick={toggle}>
                <p>Select Country</p>
                <IoIosArrowDropdown />
            </div>
            {isMenuOpen ? (
                <div className="dropdown-menu--list">
                    <div className="dropdown-menu--list-item" onClick={(event) => setCountry(event.target.innerHTML)}>Global</div>
                    <div className="dropdown-menu--list-item" onClick={(event) => setCountry(event.target.innerHTML)}>India</div>
                    <div className="dropdown-menu--list-item" onClick={(event) => setCountry(event.target.innerHTML)}>USA</div>
                    <div className="dropdown-menu--list-item" onClick={(event) => setCountry(event.target.innerHTML)}>United Kingdom</div>
                    <div className="dropdown-menu--list-item" onClick={(event) => setCountry(event.target.innerHTML)}>Israel</div>
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default DropDown