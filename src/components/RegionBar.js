const RegionBar = ({ timeRemaining }) => {
    return (
        <div className="region-bar">
            <p style={{ marginLeft: "10px" }}>Time Remaining: {timeRemaining}</p>
            <h1 className="region-bar--title">Poll for your favorite leader</h1>
        </div>
    )
}

export default RegionBar