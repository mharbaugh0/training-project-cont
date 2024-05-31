export default function (req, res, next) {
    //Setting the response content type to JSON
    res.setHeader('Content-Type', 'application/json');

    //Test response
    const message = { message: 'Hello World from server'};

    //Send the response as a JSON
    res.end(JSON.stringify(message));
}