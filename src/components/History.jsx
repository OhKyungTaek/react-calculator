import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
  height: 374px;
  padding: 10px;
  margin: 20px auto;
  border: 2px solid #000;
  border-radius: 5px;
  text-align: center;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
const Box = styled.div`
  display: inline-block;
  width: 270px;
  height: 65px;
  padding: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  text-align: right;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  cursor: pointer;
  h3 {
    margin: 0px;
  }
`;

// TODO: Panel 을 참고해서 History component 생성 및 export
class History extends React.Component {
  constructor(props){
    super(props);

    this.clickFomulaButton = this.clickFomulaButton.bind(this);
  }

  clickFomulaButton(data) {
    let firstValue = data.substr(0, 1);
    if(firstValue == "√"){
      firstValue = data.substr(2, data.length - 3);
    }else{
      firstValue = data
    }

    this.props.onClickedPastData(firstValue);
  }

  listOfButtons(){
    let listOfData = this.props.formular;
    let index;
    return listOfData.map((data, index) => {
      return <Box 
      key={index}
      onClick={() => this.clickFomulaButton(data.formula)}
      >
        {data.formula}
        <br/>
        {"=" + data.result}
      </Box>
    })
  }

  render() {//data-testid="history"
    return (
      <Container data-testid="history" class="his">
        {this.listOfButtons()}
      </Container>
    );
  }
}

export default History;
