node {
   stage("build") {
       checkout scm
  sh '''
  echo Variables from shell:
  echo ref $ref
  echo before $before
  echo pusher $pusher
  echo url $url
  echo
  echo $body
  echo
  '''
}
}
