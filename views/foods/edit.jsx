import Main from "../components/Main";

export default function Edit({ food }) {
    return (
        <Main>
            <h3>Edit Food</h3>
            <div className="row">
                <form
                    action={`/foods/${food._id}`}
                    method="POST"
                    className="col s12"
                >
                    <input type="hidden" name="_method" value="PUT" />
                    <div className="row">
                        <div className="input-field">
                            <input
                                type="text"
                                id="name"
                                name="foodName"
                                defaultValue={food.foodName}
                            />
                            <label htmlFor="foodName">Name</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field">
                            <select
                                id="foodCategory"
                                name="foodCategory"
                                defaultValue={food.foodCategory}
                            >
                                <option value="Dairy">Dairy</option>
                                <option value="Gluten">Gluten</option>
                                <option value="Nut">Nut</option>
                            </select>
                            <label htmlFor="foodCategory">Category</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field">
                            <h6>Ingredients</h6>
                            <textarea
                                id="ingredients"
                                className="materialize-textarea"
                                name="ingredients"
                                defaultValue={food.ingredients}
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
        </Main>
    );
}
