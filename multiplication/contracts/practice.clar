
;; title: practice
;; version:
;; summary:
;; description:

;; traits
;;
(use-trait tokyo-torch-coin 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)
;; token definitions
;; 

;; constants
;;
(define-constant contract-owner tx-sender)
(define-constant level-1 "beginer")
(define-constant level-2 "intermidiate")

(define-constant level-3 "premium")

;; data vars
;;
(define-data-var last-service-id uint u0)


;; data maps
;;

;; public functions
;;
(define-map service uint {name: (string-ascii 200),
amount: uint,image-uri: (string-ascii 200), description:(string-ascii 500),level:(string-ascii 20)})

(define-public (add-serivce (name (string-ascii 200)) (amount uint) (image-uri (string-ascii 200)) (description (string-ascii 500)) (level (string-ascii 20))) 
(let (
        (service_id (+ (var-get last-service-id) u1))
    )
    (asserts! (is-eq tx-sender  contract-owner) (err u4))
    (asserts! (is-service-valid level) (err u10))
    (map-insert  service service_id {name:name,amount:amount,image-uri: image-uri,level:level,description:description})
    (var-set last-service-id service_id)
    (ok true)
 )
)

;; read only functions
;;
(define-read-only (get-service (id uint))
 (map-get? service id)
)



;; private functions
;;
(define-private (is-service-valid (service-level (string-ascii 20))) 
  (if (is-eq service-level level-1) true
    (if (is-eq service-level level-2) true
      (if (is-eq service-level level-3) true
          false))))
(define-read-only (total-service)
    (ok (var-get last-service-id))
)
;; we are trying to get balance of tx-sender and get the amount of service from map and check whether they can access the service or not by returning the boolean value
(define-public (access-service (service-id uint) (tokyo-torch <tokyo-torch-coin>)) 
  (begin 
  (asserts! (>= (unwrap-panic (contract-call? tokyo-torch get-balance tx-sender)) (get amount (unwrap-panic (map-get? service service-id)))) (err u12))
  (ok true)
  )
)
