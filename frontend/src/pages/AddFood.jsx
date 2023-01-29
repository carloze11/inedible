export default function Add() {
    const options = ["Dairy", "Gluten", "Nut"];
    const selectCategory = (e) => {};

    return (
        <div>
            <h3>Add Food</h3>
            <div className="row">
                <form action="/foods" method="POST" className="col s12">
                    <div className="row">
                        <div className="input-field">
                            <input type="text" id="name" name="foodName" />
                            <label htmlFor="foodName">Name</label>
                        </div>
                    </div>
                    <select name="" id="">
                        chooose
                    </select>

                    <div className="row">
                        <div className="input-field">
                            <select
                                id="foodCategory"
                                name="foodCategory"
                                onChange={selectCategory}
                            >
                                {options.map((option, index) => {
                                    return (
                                        <option key={index}> {option}</option>
                                    );
                                })}
                                {/* <option value="Dairy" selected>
                                    Dairy
                                </option>
                                <option value="Gluten">Gluten</option>
                                <option value="Nut">Nut</option> */}
                            </select>
                            <label htmlFor="foodCategory">Category</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field">
                            <h6>Ingredients</h6>
                            <textarea
                                id="ingredients"
                                // className="materialize-textarea"
                                name="ingredients"
                            ></textarea>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field">
                            <button>Add Image</button>
                        </div>
                    </div>

                    <div className="row">
                        <input type="submit" value="Save" className="btn" />
                        <a href="/dashboard" className="btn red">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
