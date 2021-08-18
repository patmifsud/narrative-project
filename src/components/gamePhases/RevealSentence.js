import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion"

function RevealSentence(props) {

useEffect(() => {
    if (props.player.isHost) {
      
      //award winning player points?
 }}, []);


   return (
      <div className="revealSentence container">
         <div className="inner">
          <h4>Showing: RevealSentence</h4>
          <p>Winning Sentence:</p>
          <motion.div animate={{ scale: [0.1, 1] }} transition={{ duration: 1 }}>
            <h1>{props.winningSentence.text} by {props.winningSentence.user}</h1>
          </motion.div>

        </div>
      </div>
      );
    }

export default RevealSentence;