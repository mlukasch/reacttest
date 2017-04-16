import React from "react";

export default ({match}) => (
    <div>
        <div>Wetter für ID: {match.params.id}</div>
        <form>
            <input type="text"/>
            <button type="submit">Submit</button>
        </form>
    </div>
)