<?php

namespace Utils {

    const _DATA_ = './data';

    function sanitizePageName($page)
    {
        return preg_replace('/[^A-Za-z0-9-_.]/', '_', $page);
    }

    function sanitizeInput($var)
    {
        return filter_var($var, FILTER_SANITIZE_STRING);
    }

    function jsonResponse($data)
    {
        header('Content-type: application/json');
        echo json_encode($data);
        exit;
    }

    function saveData($page, $commentData)
    {
        $file = _DATA_ . '/' . sanitizePageName($page) . '.json';

        $data = [];
        if (file_exists($file)) {
            $getData = file_get_contents($file);
            $data = json_decode($getData, true);
        }

        $data[] = $commentData;
        $dataEncoded = json_encode($data, JSON_FORCE_OBJECT);

        $save = file_put_contents($file, $dataEncoded);

        return $save;
    }

    function getData($page)
    {
        $file = _DATA_ . '/' . sanitizePageName($page) . '.json';

        $data = [];
        if (file_exists($file)) {
            $getData = file_get_contents($file);
            $data = json_decode($getData, true);
        }

        return $data;
    }
}

namespace App {

    use function Utils\getData;
    use function Utils\saveData;
    use function Utils\jsonResponse;
    

    function commentAdd()
    {
        if (isset($_POST['submit'])) {
            $name = $_POST['name'] ?? null;
            $comment = $_POST['comment'] ?? null;
            $page = $_POST['page'] ?? null;

            if (empty($name) || empty($comment) || empty($page)) {
                jsonResponse([
                    'status' => 'error',
                    'msg' => 'Empty data'
                ]);
            }
            
            $data = [
                'name' => $name,
                'comment' => $comment,
                'recieved_at' => date('Y-m-d H:i:s')
            ];

            $save = saveData($page, $data);

            if ($save != false) {
                jsonResponse([
                    'status' => 'success'
                ]);
            } else {
                jsonResponse([
                    'status' => 'error',
                    'msg' => 'Fail to save'
                ]);
            }
        }
    }

    function commentGet()
    {
        if (!empty($_GET['page'])) {
            $page = $_GET['page'] ?? null;

            $data = getData($page);

            usort($data, function ($a, $b) {
                return strtotime($a['recieved_at']) < strtotime($b['recieved_at']);
            });

            jsonResponse([
                'status' => 'success',
                'data' => $data
            ]);
        }
    }

    function init()
    {
        commentAdd();
        commentGet();
    }
}

namespace {
    App\init();
}

