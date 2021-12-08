function SignUp() {
  return (
    <div className='SignUp'>
     <h1>SignUp</h1>
     <form>
       <label htmlFor="name">Name</label>
       <input type="text" id="name" name="name" required></input>
       <label htmlFor="email">e-mail</label>
       <input type="email" id="email" name="email" required></input>
       <label htmlFor="password">Password</label>
       <input type="password" id="password" name="password" required></input>
       <label htmlFor="confirmPassword">Confirm password</label>
       <input type="password" id="confirmPassword" name="ConfirmPassword" required></input>
       <button>Sign Up</button>
     </form>
    </div>
  );
}

export default SignUp;
