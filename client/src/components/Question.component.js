import React, { Fragment, useEffect, useState } from "react";
import styles from "../componentsStyles/Question.module.css";
import TestNav from "./TestNav.component";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Question(props) {
  let history = useHistory();

  const res = props.location.state.res;
  const mins = res.time.split(":")[0];
  const secs = (res.time.split(":")[1])? res.time.split(":")[1] : 0 ;
  const length = res.results.length;
  const [ques, setques] = useState(0);
  const [dynamicQue, setDynamicQuestion] =useState(4);
  const [options, setoptions] = useState([]);
  const [question, setquestion] = useState("");
  const [answers, setanswers] = useState({});
  const [correctAnswer , setCorrectAnswer]=useState("");
  const [selectedAnswer , setSelectedAnswer]=useState("");
  const [score , setScore] = useState(0);
  const [grapPoints, setgGrapPoints] = useState([]);

  const submithandler = () => {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    let pin = localStorage.getItem("pin");
    
    // let score = 0;
    // for (let i = 0; i < length; i++) {
    //   if (answers[i] == res.results[i].correct_answer) {
    //     score += 1;
    //   }
    // }
    // score = (score / length) * 100;
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "http://localhost:3003/api/test/submittest",
        {
          pin,
          email,
          name,
          score,
        },
        options
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("graphPoints",grapPoints);
        localStorage.setItem("Score",score);
        history.push({
          pathname: '/score',
          state: { graphPoints: grapPoints }
      });
     //   history.push("/score");
      })
      .catch((err) => console.log(err));
    console.log(score);
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }

  useEffect(() => {
    for (let i = 0; i < length; i++) {
      res.results[i].question = res.results[i].question.replace(
        /&#?\w+;/g,
        (match) => entities[match]
      );
      res.results[i].correct_answer = res.results[i].correct_answer.replace(
        /&#?\w+;/g,
        (match) => entities[match]
      );
      res.results[dynamicQue].incorrect_answers = res.results[
        dynamicQue
      ].incorrect_answers.map((x) =>
        x.replace(/&#?\w+;/g, (match) => entities[match])
      );
    }
  }, []);

  useEffect(() => {
    setquestion(res.results[dynamicQue].question);
    setCorrectAnswer(res.results[dynamicQue].correct_answer);
    console.log(res.results[dynamicQue]);
    let optionsRandom = [ res.results[dynamicQue].correct_answer,
    ...res.results[dynamicQue].incorrect_answers];
    // setoptions([
    //   res.results[dynamicQue].correct_answer,
    //   ...res.results[dynamicQue].incorrect_answers,
    // ]);

    optionsRandom =  shuffleArray(optionsRandom);
    setoptions(optionsRandom);
  }, [dynamicQue,ques]);

  const entities = {
    "&#039;": "'",
    "&quot;": '"',
    "&lt;": "<",
    "&gt;": ">",
    "&#39;": "'",
    "&#34;": "'",
    "&#034;": '"',
    "&#60;": "<",
    "&#060;": "<",
    "&#62;": ">",
    "&#062;": ">",
    "&amp;": "&",
    "&#38;": "&",
    "&#038;": "&",
  };

  const changeclass = (e) => {
    const domele = e.nativeEvent.path;
    
    domele.reverse();
    let ans = "";
    for (let ele of domele) {
      if (ele.id === "options") {
        for (let ans of ele.childNodes) {
          ans.className = styles.container;
        }
      } else if (ele.localName === "div" && ele.id === "") {
        ele.className = styles.containeractive;
        ans = ele.childNodes[0].value;
        setSelectedAnswer(ans);
        console.log({ans});
      }
    }
    setanswers({ ...answers, [dynamicQue]: ans });
    console.log(answers);

  };

  return (
    <Fragment>
      <TestNav mins={mins} secs={secs} submithandler={submithandler} />
      <div className={styles.qcontainer}>
        {ques + 1}. {question} 
        <span style={{fontSize:"0.5em"}}>(Difficulty Level {res.results[dynamicQue].difficulty_lvl } )</span>
      </div>
      <div id="options">
        {options.map((option, index) => (
          <div key={index} className={styles.container} onClick={changeclass}>
            <input
              className={styles.radios}
              type="radio"
              value={option}
              name="options"
              id={index.toString()}
            />
            <label htmlFor={index.toString()}>
              {String.fromCharCode("A".charCodeAt(0) + index)}. {option}
            </label>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a
          onClick={(e) => {
            if(ques !=0) {
              setques(ques - 1);
              setDynamicQuestion(dynamicQue-1);
              let answeropt = e.nativeEvent.path[2].childNodes[2].childNodes;
              for (let opt of answeropt) {
                opt.className = styles.container;
              }
            }
          }}
          className={styles.buttons1}
        >
          &#8249;
        </a>
        <a
          onClick={(e) => {
              let gp=[...grapPoints];
              console.log({gp});
              let newGp=[];
              newGp.push(ques);

            if (ques != length - 1)  {
              setques(ques + 1);
             if(correctAnswer==selectedAnswer){
              if(dynamicQue<length-1){
                setDynamicQuestion(dynamicQue+1);
                setScore(score+5);
                newGp.push(score);
                gp.push(newGp);
                setgGrapPoints(gp);

              }else{
                submithandler();
              }
             }else{
              if(dynamicQue>=0){
              setDynamicQuestion(dynamicQue-1);
              setScore(score-2);
              newGp.push(score);
              gp.push(newGp);
              setgGrapPoints(gp);

             }
             else {
              submithandler();
             }
             }
             
              let answeropt = e.nativeEvent.path[2].childNodes[2].childNodes;
              for (let opt of answeropt) {
                opt.className = styles.container;
              }
            }
          }}
          className={styles.buttons2}
        >
          &#8250;
        </a>
      </div>
    </Fragment>
  );
}

export default Question;
