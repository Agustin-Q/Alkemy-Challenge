function NewRecord(props) {
  
  return (
    <div className="NewRecord">
      <form >
       <label htmlFor="type">Type</label>
       <select id="type" name="type" >
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
       </select>
       <label htmlFor="amount" required>Amount</label>
       <input type="number" id="amount" name="amount" required></input>
       <label htmlFor="category">Category</label>
       <input type="text" id="category" name="category"></input>
       <label htmlFor="description">Description</label>
       <input type="text" id="description" name="description" ></input>
       <button>Add</button>
      </form>
    </div>  
  );
}

export default NewRecord