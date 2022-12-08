import Main from "../components/Main";
import React from "react";

export default function Index({
    foods,
    currUser,
    editIcon,
    removeTags,
    truncate,
}) {
    return (
        <Main>
            <h1>Food</h1>
            <div className="row">
                {foods.map((food) => {
                    return (
                        <div key={food._id} className="col s12 m4">
                            <div className="card">
                                <div
                                    className="card-image"
                                    dangerouslySetInnerHTML={{
                                        __html: editIcon(
                                            food.user,
                                            currUser,
                                            food._id
                                        ),
                                    }}
                                ></div>
                                <div className="card-content center-align">
                                    <h5>{food.foodName}</h5>
                                    <p>
                                        {removeTags(
                                            truncate(food.ingredients, 150)
                                        )}
                                    </p>
                                    <br />
                                    <div className="chip">
                                        <img src={food.user.image} alt="" />
                                        <a
                                            href={`/foods/user/${food.user._id}`}
                                        >
                                            {food.user.displayName}
                                        </a>
                                    </div>
                                </div>
                                <div className="card-action center-align">
                                    <a
                                        href={`/foods/${food._id}`}
                                        className="btn grey"
                                    >
                                        See More
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Main>
    );
}
