import './Filters.css';

export default function Filters({priority, status, duedate}) {
    return (
        <>
        <div className='filters'>
            <div className='filters-title'>filters</div>
            <div className='filter-fields'>
                <hr />
                <p>priority</p>
                <div className='filter-buttons'>
                    <button onClick={()=>{priority("low")}}>low</button>
                    <button onClick={()=>{priority("medium")}}>medium</button>
                    <button onClick={()=>{priority("high")}}>high</button>
                </div>
                <hr />
                <p>status</p>
                <div className='filter-buttons'>
                    <button onClick={()=>{status("pending")}}>pending</button>
                    <button onClick={()=>{status("in-progress")}}>in-progress</button>
                    <button onClick={()=>{status("done")}}>done</button>
                </div>
                <hr />
                <p>duedate</p>
                <div className='filter-buttons'>
                    <button onClick={()=>{duedate("ascending")}}>ascending</button>
                    <button onClick={()=>{duedate("descending")}}>descending</button>
                </div>
            </div>
            
        </div>
        </>
    )
};