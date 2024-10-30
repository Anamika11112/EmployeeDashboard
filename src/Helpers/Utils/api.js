const url ='https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee'
export   const fetchData = async() =>{
    try {
      const response = await fetch(url)
      if(response.ok){
        const empData = await response.json()
        return empData
      }else{
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      throw new Error(`Fetch error: ${error.message}`);
    }
  }
export  const addData = async (newEmployee) => {
  try {
    const response = await fetch(url,{
      method:"POST",
      headers : {'Content-Type': 'application/json'},
      body:JSON.stringify(newEmployee)
    })
    if(response.ok){
      const addedEmployee  = await response.json();
      return addedEmployee
    }
    else {
      throw new Error("Failed to add employee");
    }
  } catch (error) {
    throw new Error(`Failed to add employee`);
  }
  
}
export const updateData =async (employee) => {
  const url = `https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee/${employee.id}`;
  try {
    const response = await fetch(url,{
      method:"PUT",
      headers : {'Content-Type': 'application/json'},
      body:JSON.stringify(employee)
    })
    if(response.ok){
      const editedEmployee = await response.json();
      return editedEmployee
    }else{
      throw new Error("Failed to update employee");
    }
  } catch (error) {
    throw new Error("Failed to update employee");
  }
}
export const deleteData =async (employee) => {
  const url = `https://6580190d6ae0629a3f54561f.mockapi.io/api/v1/employee/${employee.id}`;
  try {
    const response = await fetch(url,{
      method:"DELETE",
      headers : {'Content-Type': 'application/json'},
    })
    if(response.ok){
      const deletedEmployee = await response.json();
      return deletedEmployee
    }else{
      throw new Error("Failed to delete employee");
    }
  } catch (error) {
    throw new Error("Failed to delete employee");
  }
}

