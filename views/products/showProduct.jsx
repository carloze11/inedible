import React from "react";
import Main from "../components/Main";

export default function ShowProduct({ title, image, description }) {
    return (
        <Main>
            <div className="row">
                <div className="col s12 m8">
                    <h3>{title}</h3>
                    <div>
                        <img src={image} alt="" />
                    </div>
                    <div className="card story">
                        <div className="card-content">
                            {/* <span className="card-title"> {{formatDate date ' MMMM Do YYYY, h:mm:ss a'}} </span>  */}
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
}
