export default function Dashboard(props) {
    return (
        <>
            <h6>Dashboard</h6>
            <h3> Welcome {props.name}! </h3>
            <p>Added Food List</p>

            {props.foods ? (
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Category</th>
                            <th>Ingredients</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.foods.map((food) => {
                            return (
                                <tr key={food._id}>
                                    <td>
                                        <a href={`/foods/${food._id}`}>
                                            {food.foodName}
                                        </a>
                                    </td>
                                    <td>
                                        <span className="dash-status">
                                            {food.foodCategory}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="dash-status">
                                            {food.ingredients.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <a
                                            href={`/foods/edit/${food._id}`}
                                            className="btn btn-float"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </a>

                                        <form
                                            action={`/foods/${food._id}`}
                                            method="POST"
                                            id="delete-form"
                                        >
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="DELETE"
                                            />
                                            <button
                                                type="submit"
                                                className="btn red"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <p>You got no food!</p>
            )}
        </>
    );
}
