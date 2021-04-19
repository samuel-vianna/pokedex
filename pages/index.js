// import Head from 'next/head'
import { useState, useEffect } from 'react';
import Search from 'react-search';
import Select from 'react-select'
import { methodGET } from './api/api'
import styles from '../styles/Styles.module.css';
import $, { data } from 'jquery';

export default function Home() {

  const [data, setData] = useState([])
  const url = 'https://pokeapi.co/api/v2/'

  useEffect(() => {
    methodGET(url + 'pokemon?limit=151').then((result) => {
      let aux = []

      Object.keys(result.results).map((x, i) => {
        aux.push({
          label: result.results[x].name,
          value: result.results[x].url
        })
      })

      setData(aux)
    })
  }, [])

  return (
    <>
      <div className={styles.main_container}>

        <div id={styles.title}>
          <h1>Pokedex</h1>
        </div>

        <PokeSearch data={data} />

      </div>

      <footer id={styles.footer}>Desenvolvido por Samuel Vianna</footer>
    </>
  )
}

export function PokeSearch(props) {
  const [url, setUrl] = useState()
  return (
    <>
      <div id={styles.list}>
        <Select placeholder='Escolha um Pokemon' options={props.data}
          onChange={(e) => { setUrl(e.value) }}
        />
      </div>

      <PokeInfo url={url} />
    </>
  )
}

export function PokeInfo(props) {

  const [data, setData] = useState([])
  const url = props.url

  useEffect(() => {
    if (url !== undefined) {
      methodGET(url).then((result) => {
        setData(result)
      })
    }
  }, [url])

  return (
    <>
      <div className={styles.sub_container}>

        <div id={styles.name}>
          <h2>{data.name}</h2>
        </div>

        <div className={styles.box}>

          <div id='left_side'>

            <div >
              <h4 className={styles.subtitle}>Stauts</h4>
              <RenderTable info={data.stats} desc='stat' />
            </div>

          </div>

          <div id='right_side'>

            <div >
              <h4 className={styles.subtitle}>Tipo</h4>
              <RenderTable info={data.types} desc='type' />
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export function RenderTable(props) {

  let aux = []

  if (props.info !== undefined && props.stats !== null) {
    switch (props.desc) {
      case 'stat':
        Object.keys(props.info).map((x) => {
          aux.push(
            <tr key={props.info[x].stat.name}>
              <td>{props.info[x].stat.name}</td>
              <td>{props.info[x].base_stat}</td>
            </tr>
          )
        })
        break;
      case 'type':
        Object.keys(props.info).map((x) => {
          aux.push(
            <tr key={props.info[x].type.name}>
              <td>{props.info[x].type.name}</td>
            </tr>
          )
        })
    }

  }

  return (
    <table className={styles.table}>
      <hr></hr>
      <div>{aux}</div>
      <hr></hr>
    </table>
  )

}