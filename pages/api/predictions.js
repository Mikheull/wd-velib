import mongoose from "mongoose";
import moment from 'moment';
import axios from 'axios';

mongoose.connect(`mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}`);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

export default async (req, res) => {
    try {
        const {method, query} = req;

        switch (method) {
            case "GET":
                if(query.date){

                    var startdate = moment(query.date, "YYYY-MM-DD");
                    let increase = 0;

                    const arr = [];
                    const json = {}

                    // Boucle pour les 4jours
                    for (let i = 0; i < 28; i += 7) {
                        let newdate = startdate.subtract(increase, "days");
                        newdate = newdate.format("YYYY-MM-DD");
                        increase += 7;
                        
                        await axios.get(`http://localhost:3000/api/analyze?code=${query.code}&date=${newdate}`)
                        .then((response) => {
                            arr.push(response.data.data)
                        })
                        .catch((error)=>{
                            console.log(error);
                        });
                    }


                    // Boucle pour chaque demi heure
                    let _hoursData_ebike = []
                    let _hoursData_mechanical = []
                    let _hoursData_places = []
                    
                    for (let i = 0; i <= 47; i ++) {
                        if(arr[0] && arr[0][i] && arr[0][i].fields){
                            _hoursData_ebike.push(arr[0][i].fields.ebike)
                            _hoursData_mechanical.push(arr[0][i].fields.mechanical)
                            _hoursData_places.push(arr[0][i].fields.numdocksavailable)
                        }
                        if(arr[1] && arr[1][i] && arr[1][i].fields){
                            _hoursData_ebike.push(arr[1][i].fields.ebike)
                            _hoursData_mechanical.push(arr[1][i].fields.mechanical)
                            _hoursData_places.push(arr[1][i].fields.numdocksavailable)
                        }
                        if(arr[2] && arr[2][i] && arr[2][i].fields){
                            _hoursData_ebike.push(arr[2][i].fields.ebike)
                            _hoursData_mechanical.push(arr[2][i].fields.mechanical)
                            _hoursData_places.push(arr[2][i].fields.numdocksavailable)
                        }
                    }

                    
                    for (let i = 0; i <= 47; i ++) {
                        json[i] = {
                            fields: {
                                ebike: 0,
                                numdocksavailable: 0,
                                mechanical: 0,
                            }
                        };

                        const loop = ["ebike", "mechanical", "places"];
                        loop.forEach(element => {
                            let total = 0;
                            let totalSum = 0;

                            if(element == 'ebike'){
                                if(_hoursData_ebike[i]){totalSum += _hoursData_ebike[i]; total ++}
                                if(_hoursData_ebike[i]){totalSum += _hoursData_ebike[i]; total ++}
                                if(_hoursData_ebike[i]){totalSum += _hoursData_ebike[i]; total ++}
                                if(_hoursData_ebike[i]){totalSum += _hoursData_ebike[i]; total ++}
                                json[i].fields.ebike = Math.floor(totalSum/total);
                            }
                            if(element == 'mechanical'){
                                if(_hoursData_mechanical[i]){totalSum += _hoursData_mechanical[i]; total ++}
                                if(_hoursData_mechanical[i]){totalSum += _hoursData_mechanical[i]; total ++}
                                if(_hoursData_mechanical[i]){totalSum += _hoursData_mechanical[i]; total ++}
                                if(_hoursData_mechanical[i]){totalSum += _hoursData_mechanical[i]; total ++}
                                json[i].fields.mechanical = Math.floor(totalSum/total);
                            }
                            if(element == 'places'){
                                if(_hoursData_places[i]){totalSum += _hoursData_places[i]; total ++}
                                if(_hoursData_places[i]){totalSum += _hoursData_places[i]; total ++}
                                if(_hoursData_places[i]){totalSum += _hoursData_places[i]; total ++}
                                if(_hoursData_places[i]){totalSum += _hoursData_places[i]; total ++}
                                json[i].fields.numdocksavailable = Math.floor(totalSum/total);
                            }
                        });
                    }
                    
                    res.status(200).json(
                        {
                            date: query.date,
                            data: json,
                        }
                    );
                }
                break;
            default:
                res.setHeader("Allow", ["GET"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({ error: e.message || "something went wrong" });
    }
    
};