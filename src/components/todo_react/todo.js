import React, { useEffect, useState } from 'react'
import "./style.css";
//get the localstorage Data
const getLocalData = () =>{
    const lists = localStorage.getItem("myTodoList");

    if (lists) {
        return JSON.parse(lists);
    }else{
        return []; 
    }
}
const Todo = () => {
    const [inputValue, setInputValue] = useState();
    const [items,setItems] = useState(getLocalData());
    const [isEditItems,setIsEditItems] = useState("");
    const [ toggoleButton,setToggoleButton] = useState(false);
    // add the items function
    const addItems = () =>{
        if(!inputValue){
            alert('plz fill the data');
        }else if(inputValue && toggoleButton){
            setItems(
                items.map((curElem)=>{
                    if (curElem.id === isEditItems ) {
                     return {...curElem,name:inputValue}   
                    }
                    return curElem;
                })
            )
                setInputValue([]);
                setIsEditItems(null);
                setToggoleButton(false);
        }
        else{
            const myNewInputValue = {
                id: new Date().getTime().toString(),
                name:inputValue,
            }
            setItems([...items,myNewInputValue]);
            setInputValue("");
        }
    };
    //Edit Items
    const editItems  = (index)=>{
        const items_todo_edited = items.find((curElem) =>{
            return curElem.id === index;
        });
        setInputValue(items_todo_edited.name);
        setIsEditItems(index);
        setToggoleButton(true);
    };
    // Delete items 
    const deleteItems = (index) =>{
        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== index;
        })
        setItems(updatedItems); 
    }
    // remove all
    const removeAll = () =>{
        setItems([]);
    }
    // add localstorage
    useEffect (()=>{
        localStorage.setItem("myTodoList",JSON.stringify(items))
    },[items]);
    
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add your list here 👌</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍️ Add Items '
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className='form-control' />
                            {toggoleButton ?( <i className="far fa-edit add-btn" onClick={addItems}></i>) : ( <i className="fa fa-plus" onClick={addItems}></i>)}
                       
                    </div>
                    {/* show our items  */}
                    <div className="showItems">
                        {items.map((curElement)=>{ 
                            return (
                        <div className="eachItem">
                            <h3>{curElement.name}</h3>
                            <div className="todo-btn" key={curElement.id}>
                                <i className="far fa-edit add-btn" onClick={()=>editItems(curElement.id)}></i>
                                <i className="far fa-trash-alt" onClick={()=>deleteItems(curElement.id)}></i>
                            </div>
                        </div>
                            );
                        })}
                    </div>
                    {/* remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove all" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo