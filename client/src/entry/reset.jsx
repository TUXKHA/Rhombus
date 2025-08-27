
function P()
{
    return(
        <form>
      <label>Email
        <input type="text" placeholder="Enter Your Email" name = "emailp" value = "" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" required/>
      </label>
      <input type="submit" />
    </form>
    );
}

export default P;