import Header from '@/components/Header'
import { Box, Container, Stack, Text } from '@chakra-ui/react'
import { Fragment } from 'react'

export type PrivacyPolicyPageProps = object

export default async function PrivacyPolicyPage(props: PrivacyPolicyPageProps) {

    const { } = props

    return (
        <Fragment>
            <Header />
            <Box as='section' backgroundColor='#6B3FA0' minHeight='100vh' paddingTop='72px' width='full'>
                <Container maxWidth='container.md' paddingBottom={28} paddingTop={20}>
                    <Stack alignItems='center' spacing={0}>
                        <Text
                            as='h1'
                            color='#ffffff'
                            fontSize={['36px', '48px', '56px']}
                            fontWeight='700'>
                            Política de Privacidade
                        </Text>
                        <Text color='#ffffff' fontSize='16px' fontWeight='500' lineHeight='1.75' marginTop={20}>
                            Última atualização: 07 de setembro de 2024<br />
                            <br />
                            <b>Introdução</b><br />
                            Sua privacidade é importante para nós. Esta Política de Privacidade descreve como coletamos,
                            usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma.<br />
                            <br />
                            <b>2. Informações que Coletamos</b><br />
                            Coletamos as seguintes informações quando você utiliza nossa plataforma:Informações de
                            Cadastro: Nome, data de início do relacionamento, mensagem personalizada, fotos do casal
                            e endereço de email cadastrado.Informações de Pagamento: Endereço de email cadastrado no
                            Stripe para processamento do pagamento e envio do link da página personalizada.<br />
                            <br />
                            <b>3. Como Usamos Suas Informações</b><br />
                            Utilizamos suas informações para:Processar o pagamento e enviar o link da página personalizada
                            via email.Personalizar e criar a página do casal com as informações fornecidas.Melhorar nossos
                            serviços e suporte ao cliente.<br />
                            <br />
                            <b>4. Compartilhamento de Informações</b><br />
                            Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para
                            processar pagamentos (Stripe) e conforme exigido por lei.<br />
                            <br />
                            <b>5. Segurança</b><br />
                            Implementamos medidas de segurança para proteger suas informações pessoais contra acesso,
                            uso ou divulgação não autorizados. No entanto, nenhuma transmissão de dados pela internet é
                            completamente segura, e não podemos garantir a segurança absoluta.<br />
                            <br />
                            <b>6. Retenção de Dados</b><br />
                            Reteremos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades
                            para as quais foram coletadas ou conforme exigido por lei.<br />
                            <br />
                            <b>7. Seus Direitos</b><br />
                            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer
                            esses direitos, entre em contato conosco pelo email: andreeliasdev@gmail.com<br />
                            <br />
                            <b>8. Alterações nesta Política de Privacidade</b><br />
                            Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos isso,
                            revisaremos a data da {'"'}última atualização{'"'} no topo desta página. É sua responsabilidade
                            revisar esta política periodicamente para se manter informado sobre quaisquer alterações.<br />
                            <br />
                            <b>9. Contato</b><br />
                            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco pelo
                            email: andreeliasdev@gmail.com
                        </Text>
                    </Stack>
                </Container>
            </Box>
        </Fragment>
    )
}