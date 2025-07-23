# Orbital Rojo

-> QuioscoDeComidaRapida

=== QuioscoDeComidaRapida

En los sectores obreros no sobra espacio. Vivís acostumbrados al hacinamiento, al ruido, al amplio espectro de olores que unos recicladores de aire sobrecargados son incapaces de neutralizar. Y esto es más cierto en la estación de tren del puerto que en ninguna otra parte.

+ [Busco al contacto]

-

Tardas varios minutos en dar con él, en uno de los quioscos de comida rápida cercanos. Uno de los hombres de Isaac.

Te da indicaciones sobre el trabajo mientras come tallarines, sin apenas dirigirte la mirada. El cliente es uno de los guardas de seguridad del puerto, al otro lado del puesto de control. Te pagará en el momento de la entrega. Está todo en la mochila.

Finaliza sin prestar atención una sola vez a la bolsa que descansa bajo su taburete metálico.


-> QuioscoDeComidaRapida.opciones

= opciones

* [Miro la mochila] -> QuioscoDeComidaRapida.MirarMochila
* [—¿Cómo voy a entrar ahí?] -> QuioscoDeComidaRapida.ComoEntrar
* [Cojo la mochila] -> QuioscoDeComidaRapida.CogerMochila

= MirarMochila

Dentro hay una docena de viales de plástico. Suficientes como para pasar los próximos años encerrado si te pillan con ellos. 

-> QuioscoDeComidaRapida.opciones

= ComoEntrar

¿Y a mi qué coño me preguntas? Llama a la puerta a ver.

-> QuioscoDeComidaRapida.opciones

= CogerMochila

Agarras la mochila y te sumerges entre la gente, deseando que el desgraciado se atragante con sus putos tallarines.

* [Continuar #highlight]

-
@cleanScreen
Siguiente escena. Delante del puesto de control.

-> END


-> RegistroNocturno_Suenno

=== RegistroNocturno_Suenno

Estás tumbado de espaldas, flotando.

Meciéndote con suavidad en el oleaje. Un mar en expansión a tu alrededor y un cielo cegadoramente azul sobre tu cabeza.

+ [El mismo sueño recurrente de siempre]

-

Incluso dentro del sueño sabes que no es real.

Al fin y al cabo nunca has visto ningún mar. Nunca nada tan azul como este cielo que tienes delante. No es más que una ilusión creada por tu subconsciente.

Y aunque lo sabes sigues aquí tumbado, flotando, disfrutando de la sensación del agua lamiéndote delicadamente.

Y entonces notas algo que tira de ti desde las profundidades.

+ [Me resisto #motorics(50) #Suenno.resistir_exito #Suenno.resistir_fracaso] -> DONE
+ [Me resisto] -> RegistroNocturno_Suenno.resistir_fracaso
+ [Me dejo llevar] -> RegistroNocturno_Suenno.dejarse_llevar

= resistir_exito
Forcejeas durante unos instantes, luchando por mantenerte a flote. Hasta que el tirón se detiene de pronto.

Acto seguido alguien te golpea en la cara con violencia.

+ [Despierto #highlight] -> END

= resistir_fracaso
Intentas mantenerte a flote brazeando y pataleando con todas tus fuerzas pero el tirón es imparable.

-> RegistroNocturno_Suenno.dejarse_llevar

= dejarse_llevar
Te sumerjes a toda velocidad.

+ [Despierto #highlight] -> END





=== Habitaculo
@cleanScreen
-> END

