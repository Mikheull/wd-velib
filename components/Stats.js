import React, {Component} from 'react';
import axios from 'axios'
import { Line } from '@reactchartjs/react-chart.js'
import moment from 'moment';
import 'moment/locale/fr';

// Components
import NextDay from './NextDay';
import PrevDay from './PrevDay';

// Styles
import '../public/styles/map.module.css';

class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
          data_mechanical: [],
          data_electric: [],
          data_places: [],
          date_query: moment().format("YYYY-MM-DD"),
        }
    }

    componentDidMount() {
      this.fetchData(this.state.date_query);
    }

    fetchData(startdate) {
      let data_mechanical = [];
      let data_electric = [];
      let data_places = [];

      axios.get(`/api/predictions?code=${this.props.code}&date=${startdate}`)
        .then((response) => {
          let i = true;
          response.data.data.forEach(element => {
            if(i){
              i = false
              data_mechanical.push(element.fields.mechanical);
              data_electric.push(element.fields.ebike);
              data_places.push(element.fields.numdocksavailable);
            }else{
              i = true
            }
          });
          this.setState({data_mechanical: data_mechanical});
          this.setState({data_electric: data_electric});
          this.setState({data_places: data_places});
        })
      .catch((error)=>{
        console.log(error);
      });
    }
    
    remDay() {
      var startdate = moment(this.state.date_query, "YYYY-MM-DD");
      startdate = startdate.subtract(1, "days");
      startdate = startdate.format("YYYY-MM-DD");
      this.setState({date_query: startdate});

      this.fetchData(startdate)
    }
    addDay() {
      var startdate = moment(this.state.date_query, "YYYY-MM-DD");
      startdate = startdate.add(1, "days");
      startdate = startdate.format("YYYY-MM-DD");
      this.setState({date_query: startdate});
      
      this.fetchData(startdate)
    }

    render() {
        const data = {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            datasets: [
              {
                label: 'Mecanique',
                data: this.state.data_mechanical,
                fill: false,
                backgroundColor: 'rgb(180, 229, 48)',
                borderColor: 'rgba(180, 229, 48, 0.5)',
                yAxisID: 'y-axis-1',
              },
              {
                label: 'Éléctrique',
                data: this.state.data_electric,
                fill: false,
                backgroundColor: 'rgb(48, 132, 229)',
                borderColor: 'rgba(48, 132, 229, 0.5)',
                yAxisID: 'y-axis-1',
              },
              {
                label: 'Places',
                data: this.state.data_places,
                fill: false,
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                yAxisID: 'y-axis-1',
              },
            ],
        }
        const options = {
            scales: {
                yAxes: [
                  {
                      type: 'linear',
                      display: false,
                      position: 'left',
                      id: 'y-axis-1',
                  }
                ],
            },
        }
        
        return (
            <section>
                <Line data={data} options={options} />
                <p className="statsTitle">{this.state.date_query}</p>
                <div className="statsControll">
                  <PrevDay remMethod={() => this.remDay()} />
                  <NextDay addMethod={() => this.addDay()} />
                </div>
            </section>
        )
    }
}

export default Stats;