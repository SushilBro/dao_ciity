;; title: drive
;; version:
;; summary:
;; description:

;; traits
;;
(impl-trait 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait)

;; token definitions
;; 
(define-fungible-token pokhara-city-coin)

;; constants
;;
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant contract-owner tx-sender)
(define-constant reward-holding-address tx-sender)

;; data vars
;;
;; (define-data-var tip-or-not bool false)
;; (define-data-var ride-cost uint u0) 

;; data maps
;;

;; public functions
;;
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
    (begin
        (asserts! (is-eq tx-sender sender) err-not-token-owner)

        (try! (ft-transfer? pokhara-city-coin amount sender recipient))
        (match memo to-print (print to-print) 0x)
        (ok true)
    )
)

(define-public (transfer-rewards (amount uint) (tips (optional uint)) (driver principal) (passanger principal))
(begin
    (asserts! (is-eq tx-sender contract-owner) err-not-token-owner)
    (match tips tips-amount 
        (begin 
            (asserts! (> amount tips-amount) (err u10))
            (try! (ft-transfer? pokhara-city-coin tips-amount contract-owner driver))
            (try! (ft-transfer? pokhara-city-coin (- amount tips-amount) contract-owner passanger))
            (ok true)
        )
        (begin
            (try! (ft-transfer? pokhara-city-coin amount contract-owner passanger))
            (ok true)
        )
    )
))

(define-public (mint (amount uint) (recipient principal))
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (ft-mint? pokhara-city-coin amount recipient)
    )
)

;; (define-public (give-tip (tip-amount uint) (driver principal)) 
;;     (begin
;;     (asserts! (is-eq tx-sender sender) err-not-token-owner)
;;     (try! (ft-transfer? pokhara-city-coin amount tx-sender driver))
;;     (ok true)
;;     )
;; )


;; read only functions
;;

(define-read-only (get-name)
    (ok "Clarity Coin")
)
(define-read-only (get-symbol)
    (ok "PC")
)

(define-read-only (get-decimals)
    (ok u6)
)
(define-read-only (get-balance (who principal))
    (ok (ft-get-balance pokhara-city-coin who))
)
(define-read-only (get-total-supply)
    (ok (ft-get-supply pokhara-city-coin))
)
(define-read-only (get-token-uri)
    (ok none)
)

;; private functions
;;

