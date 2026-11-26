
// AQUÍ GESTIONAS TUS BEATS (SÓLO MODIFICA ESTA LISTA)

const misBeats = [

  {
    id: 1,
    titulo: "Sad Type",
    genre: "Reggaeton",
    bpm: 90,
    precioBasico: "$12 USD ($220 MXN)",
    precioPro: "$25 USD ($450 MXN)",
    archivo: "audios/r64.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/1200x/e3/3a/5a/e33a5a8f6fa9222aa6cf8e76235e0000.jpg"
  },

  {
    id: 2,
    titulo: "Relax Love",
    genre: "Reggaeton",
    bpm: 86,
    precioBasico: "$10 USD ($190 MXN)",
    precioPro: "$21 USD ($390 MXN)",
    archivo: "audios/r63.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS902rPiwv2J9VYLw2OLp89_2apBEU7qRuMWpMPZDP16yuaNB_8ftPOGbrp&s=10"
  },

  {
    id: 3,
    titulo: "Desamor beat",
    genre: "Reggaeton",
    bpm: 96,
    precioBasico: "$16 USD ($290 MXN)",
    precioPro: "$25 USD ($450 MXN)",
    archivo: "audios/r41.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/236x/a5/1e/9a/a51e9ae102cb13a9f4980398af82d2d6.jpg"
  },

  {
    id: 4,
    titulo: "Recuerdos Olds",
    genre: "Reggaeton",
    bpm: 94,
    precioBasico: "$11 USD ($200 MXN)",
    precioPro: "$21 USD ($390 MXN)",
    archivo: "audios/r90.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/236x/fa/3b/c8/fa3bc8369d7123174fb331b13096a2d1.jpg"
  },

  {
    id: 5,
    titulo: "Melancolia Party",
    genre: "Reggaeton",
    bpm: 95,
    precioBasico: "$12 USD ($220MXN)",
    precioPro: "$21 USD ($390 MXN)",
    archivo: "audios/r66.mp3",
    vendido: false,
    tipo: "",
    estado: "no",
    img: "https://i.pinimg.com/736x/76/31/25/763125b40635d0cec6c12eb9d0e55271.jpg"
  },

  {
    id: 6,
    titulo: "Street Loove",
    genre: "Trap",
    bpm: 65,
    precioBasico: "$8 USD ($150MXN)",
    precioPro: "$11 USD ($200 MXN)",
    archivo: "audios/t3.mp3",
    vendido: false,
    tipo: "",
    estado: "no",
    img: "https://i.pinimg.com/236x/90/f3/28/90f3281956d774d19f9ea9c193c8c453.jpg?nii=t"
  },

  {
    id: 7,
    titulo: "Emboscada Tsz",
    genre: "Trap",
    bpm: 130,
    precioBasico: "$8 USD ($150MXN)",
    precioPro: "$11 USD ($200 MXN)",
    archivo: "audios/t4.mp3",
    vendido: false,
    tipo: "finales",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9-3SV221zmIyFD2ibmUQpN1mh1IcpZCPcpjMokQ8htRUmg1G7NSrnTI8&s=10"
  },

  {
    id: 8,
    titulo: "Party White",
    genre: "Guaracha",
    bpm: 0,
    precioBasico: "$16 USD ($290MXN)",
    precioPro: "$27 USD ($490 MXN)",
    archivo: "audios/g4.mp3",
    vendido: false,
    tipo: "",
    estado: "no",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaK19ir8n-OrkxtdjgOwZP-4rJNQHoyj84ggEPkzQDsgY1OLZW2xpzZRc&s=10"
  },

  {
    id: 9,
    titulo: "Sad Life",
    genre: "Trap",
    bpm: 0,
    precioBasico: "$6 USD ($100MXN)",
    precioPro: "$14 USD ($250 MXN)",
    archivo: "audios/t1.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/236x/69/3a/27/693a27d33dc28e8b249b22dd7b7bd779.jpg"
  },

  {
    id: 10,
    titulo: "Bellakeo Type",
    genre: "Reggaeton",
    bpm: 90,
    precioBasico: "$11 USD ($220MXN)",
    precioPro: "$27 USD ($490 MXN)",
    archivo: "audios/r39.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/736x/45/34/22/45342224fad62c4cbcd43e28d76cf975.jpg"
  },

  {
    id: 11,
    titulo: "Galaxia Type",
    genre: "Reggaeton",
    bpm: 92,
    precioBasico: "$12 USD ($220MXN)",
    precioPro: "$19 USD ($350 MXN)",
    archivo: "audios/r69.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/736x/22/35/8b/22358b9ac335613e03baf85dc1c47260.jpg"
  },

  {
    id: 12,
    titulo: "Decepción Mood",
    genre: "Reggaeton",
    bpm: 91,
    precioBasico: "$16 USD ($290MXN)",
    precioPro: "$21 USD ($390 MXN)",
    archivo: "audios/r67_2.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/236x/f6/e9/9b/f6e99b68b9916aac67fbf5a3db19b89d.jpg"
  },

  {
    id: 13,
    titulo: "Fiesta Night",
    genre: "Reggaeton",
    bpm: 97,
    precioBasico: "$16 USD ($190MXN)",
    precioPro: "$17 USD ($320 MXN)",
    archivo: "audios/r72.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS43VJp2UZm9yj1O1qhGrYbCXZIJT9D27a7llv6_pCLxipdDNypWjwkBiGv&s=10"
  },

  {
    id: 14,
    titulo: "Traiciones Type CrMJ",
    genre: "Reggaeton",
    bpm: 95,
    precioBasico: "$15 USD ($310MXN)",
    precioPro: "$22 USD ($400 MXN)",
    archivo: "audios/r70.mp3",
    vendido: false,
    tipo: "mejor",
    estado: "si",
    img: "https://i.pinimg.com/236x/af/11/d8/af11d899773838780858cb068c48fee4.jpg"
  },

  {
    id: 15,
    titulo: "Viejos tiempos",
    genre: "Reggaeton",
    bpm: 86,
    precioBasico: "$13 USD ($260MXN)",
    precioPro: "$27 USD ($490 MXN)",
    archivo: "audios/r88.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i1.sndcdn.com/artworks-000547503816-z0ksd8-t500x500.jpg"
  },

  {
    id: 16,
    titulo: "Triste Type FyMn",
    genre: "Reggaeton",
    bpm: 95,
    precioBasico: "$14 USD ($280MXN)",
    precioPro: "$22 USD ($400 MXN)",
    archivo: "audios/r85cat.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/564x/e9/ae/22/e9ae22eb214b01c2559e3aa803d44781.jpg"
  },

  {
    id: 17,
    titulo: "Obsesionado Old",
    genre: "Reggaeton",
    bpm: 88,
    precioBasico: "$14 USD ($280MXN)",
    precioPro: "$24 USD ($450 MXN)",
    archivo: "audios/r91.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://billboard.com.co/wp-content/uploads/2025/09/DUOS-REGGAETON.png"
  },

  {
    id: 18,
    titulo: "Perreo No Love",
    genre: "Reggaeton",
    bpm: 95,
    precioBasico: "$22 USD ($400MXN)",
    precioPro: "$28 USD ($520 MXN)",
    archivo: "audios/r45cat.mp3",
    vendido: false,
    tipo: "mejor",
    estado: "si",
    img: "https://i.pinimg.com/736x/0a/33/89/0a33894c7eaf49b08fb4b76b11274ff6.jpg"
  },

  {
    id: 19,
    titulo: "Romantic Style Old",
    genre: "Reggaeton",
    bpm: 86,
    precioBasico: "$12 USD ($220MXN)",
    precioPro: "$16 USD ($300 MXN)",
    archivo: "audios/r92.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIXrdLEgWWl0MPiyB1d8bZPVQO1E_JnxqZwTZPJpGglTMZ-KdhPOWbuNmW&s=10"
  },

  {
    id: 20,
    titulo: "Apretado",
    genre: "Reggaeton",
    bpm: 96,
    precioBasico: "$11 USD ($220MXN)",
    precioPro: "$22 USD ($400 MXN)",
    archivo: "audios/r93.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://www.toptrendsguide.com/wp-content/uploads/2022/08/Hottest-Instagram-Models.jpg"
  },

  {
    id: 21,
    titulo: "Fotos",
    genre: "Reggaeton",
    bpm: 95,
    precioBasico: "$10 USD ($190MXN)",
    precioPro: "$12 USD ($240 MXN)",
    archivo: "audios/r94.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/236x/37/67/98/376798292160887467d2ab30f4644b96.jpg"
  },

  {
    id: 22,
    titulo: "Secretos",
    genre: "Reggaeton",
    bpm: 94,
    precioBasico: "$12 USD ($240MXN)",
    precioPro: "$17 USD ($320 MXN)",
    archivo: "audios/r95.mp3",
    vendido: false,
    tipo: "mejor",
    estado: "si",
    img: "https://i.pinimg.com/236x/ee/9e/41/ee9e412d4c6150422743d9cfbc080da0.jpg"
  },

  {
    id: 23,
    titulo: "Lagrimas",
    genre: "Reggaeton",
    bpm: 94,
    precioBasico: "$10 USD ( $190MXN )",
    precioPro: "$12 USD ($240 MXN)",
    archivo: "audios/r96.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/originals/51/17/2d/51172d35896202663a8cf24b786fdddc.jpg"
  }
,

  {
    id: 24,
    titulo: "Tu número",
    genre: "Reggaeton",
    bpm: 96,
    precioBasico: "$10 USD ( $190MXN )",
    precioPro: "$12 USD ($240 MXN)",
    archivo: "audios/r97.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://i.pinimg.com/236x/09/93/c2/0993c2e1cabf78fa67d2e79a8b272efb.jpg"
  }
,

  {
    id: 25,
    titulo: "Tu rostro",
    genre: "Reggaeton",
    bpm: 92,
    precioBasico: "$11 USD ( $210MXN )",
    precioPro: "$15 USD ($290 MXN)",
    archivo: "audios/r98.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFbXkm7s_hj6fH135XGn15VCmaP4JhrtfiuqdBirAuFkrSVFQk1Tmo4P2N&s=10"
  }

  ,

  {
    id: 26,
    titulo: "Piel a Piel",
    genre: "Reggaeton",
    bpm: 85,
    precioBasico: "$13 USD ( $260MXN )",
    precioPro: "$17 USD ($320 MXN)",
    archivo: "audios/r99.mp3",
    vendido: false,
    tipo: "reciente",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNqbvgKTfdJH23D1qAKMNW9l3g2vgyeD-XjtQQvYPXzYgMwRKireQMO9V&s=10"
  }

    ,

  {
    id: 27,
    titulo: "Tentación",
    genre: "Reggaeton",
    bpm: 94,
    precioBasico: "$11 USD ( $220MXN )",
    precioPro: "$17 USD ($320 MXN)",
    archivo: "audios/r101.mp3",
    vendido: false,
    tipo: "reciente",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnpDz7AX_mWZNWvKpNstu6lyJ8ylvXO7hPOaT9gIr4e0cG2OxR8thBuXY&s=10"
  }


    ,

  {
    id: 28,
    titulo: "Tirote0",
    genre: "Reggaeton",
    bpm: 90,
    precioBasico: "$11 USD ( $220MXN )",
    precioPro: "$14 USD (270 MXN)",
    archivo: "audios/r102.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyHprTuujayIcbPZVB_lUru2xY-l7M1vc46Nv36EsrZHRQ66KjyltjZdiT&s=10"
  }
    ,

  {
    id: 29,
    titulo: "En la calle",
    genre: "Reggaeton",
    bpm: 95,
    precioBasico: "$9 USD ( $190MXN )",
    precioPro: "$11 USD (220 MXN)",
    archivo: "audios/r103.mp3",
    vendido: false,
    tipo: "",
    estado: "si",
    img: "https://images.pexels.com/photos/10529735/pexels-photo-10529735.jpeg?cs=srgb&dl=pexels-marlon-alves-2016519-10529735.jpg&fm=jpg"
  }

];
