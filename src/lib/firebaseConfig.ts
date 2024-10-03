import admin from 'firebase-admin'

const firebaseServiceAccountKey = process.env['FIREBASE_SERVICE_ACCOUNT_KEY'] || ''
    , serviceAccount = JSON.parse(Buffer.from(firebaseServiceAccountKey, 'base64').toString('ascii'))

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    })
}

const db = admin.firestore()

export { db }