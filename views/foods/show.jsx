import Main from "../components/Main";

export default function Show({
    food,
    currUser,
    truncate,
    removeTags,
    editIcon,
}) {
    return (
        <Main>
            <div className="row">
                <div className="col s12 m8">
                    <h3>
                        {food.foodName}
                        <small
                            dangerouslySetInnerHTML={{
                                __html: editIcon(
                                    food.user,
                                    currUser,
                                    food._id,
                                    false
                                ),
                            }}
                        ></small>
                    </h3>
                    <div className="card story">
                        <div className="card-content">
                            {/* <span className="card-title"> {{formatDate date 'MMMM Do YYYY, h:mm:ss a'}} </span> */}
                            {removeTags(truncate(food.ingredients, 150))}
                        </div>
                    </div>
                </div>
                <div className="col s12 m4">
                    <div className="card center-align">
                        <div className="card-content">
                            <span className="card-title">
                                {food.user.displayName}
                            </span>
                            <img
                                src={food.user.image}
                                className="circle responsive-img img-small"
                            />
                        </div>
                        <div className="card-action">
                            <a href={`/foods/${food.user.id}`}>
                                More From {food.user.displayName.split(" ")[0]}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
