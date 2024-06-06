# title: Orbital Quebrado. El púgil
# author: J. Francisco Martín Lisaso

VAR intellect = 0
VAR motorics = 0
VAR physique = 0
VAR psyche = 0

-> Combate

=== Combate ===

Hacer acrobacias en gravedad cero suele ser divertido. De verdad.

Apostarías un trago a que si te pasearas por el puerto de la estación un día cualquiera verías algún estibador lanzándose de un lado a otro haciendo tirabuzones y dando volteretas. Aquello parece un puto circo a veces.

Pero no es tan divertido cuando has perdido el control y giras desorientado sobre ti mismo.

Los focos del almacén parecen orbitar a tu alrededor a toda velocidad. Como decenas de soles saliendo y poniéndose de nuevo en apenas unos fragmentos de segundo.

Y entonces te estrellas con una de las paredes de la jaula. Con cierta dificultad consigues aferrarte a la malla metálica y recuperar el control.

La multitud apelotonada en el almacén grita. Están eufóricos después de ese último crochet que te ha encajado Lecilia.

* [La busco con la mirada]

-
Necesitas un momento para ubicarla de nuevo. La encuentras sobre tu cabeza, a algunos metros de distancia, colocada en otra de las caras que delimita el cubículo del ring. 

* [Me adelanto y ataco primero #physique #10] -> Combate.asaltoUnoAtaque
* [Estudio sus movimientos buscando un punto débil #intellect #10] -> Combate.asaltoUnoEstudio

= asaltoUnoAtaque

-> DONE

= asaltoUnoAtaque_exito

-> Combate.asaltoDos

= asaltoUnoAtaque_fracaso

-> Combate.asaltoDos

= asaltoUnoEstudio

-> DONE

= asaltoUnoEstudio_exito

-> Combate.asaltoDos

= asaltoUnoEstudio_fracaso

-> Combate.asaltoDos

= asaltoDos

Once upon a time...

 * There were two choices.
 * There were four lines of content.

- They lived happily ever after.
    -> END
